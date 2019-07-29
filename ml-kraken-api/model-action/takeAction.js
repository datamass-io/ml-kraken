const dynamodb = require('../dynamo-utils/dynamodb');
const middy = require('middy');
const { cors } = require('middy/middlewares');
var AWS = require('aws-sdk');
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var modelAction = require('../models/model-action');
const uuid = require('uuid');

const takeModelAction = async (event, context) => {

    const data = event.body;

    let model = new modelAction(data);
    model.id = uuid.v1()
    console.log(model);

    if(model.action === 'run'){
        model.action = 'scheduled to run'
    }

    if(model.action === 'stop'){
        model.action = 'scheduled to stop'
    }

    let queueParams = {
        DelaySeconds: 1,
        MessageBody: JSON.stringify(model),
        QueueUrl: process.env.SQS_URL
        //QueueUrl: 'http://0.0.0.0:9324/queue/default'
    };

    //console.log(process.env.SQS_URL)

    const respo = await sqs.sendMessage(queueParams).promise();
    console.log(respo);
    model.msgId = respo.MessageId;

    console.log(model);
    const params = {
        TableName: process.env.DYNAMODB_MSTATUS,
        Item: model,
    };

    const dbdata = await dynamodb.put(params).promise();


    const response = {
        statusCode: 200,
        body: JSON.stringify({params, dbdata, respo}),
    };

    return response;
};

// Adds CORS headers to responses
const takeAction = middy(takeModelAction).use(cors())
module.exports = {takeAction}




