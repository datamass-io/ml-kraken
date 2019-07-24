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

    console.log(process.env.DYNAMODB_MSTATUS);

    const params = {
        TableName: process.env.DYNAMODB_MSTATUS,
        Item: model,
    };

    const dbdata = await dynamodb.put(params).promise();
    const response = {
        statusCode: 200,
        body: JSON.stringify({params, dbdata}),
    };


    console.log(proces.env.ACTION_QUEUE);

    // var queueParams = {
    //     DelaySeconds: 1,
    //     MessageBody: JSON.stringify(params),
    //     QueueUrl: "https://sqs.eu-west-1.amazonaws.com/655908530487/transQueue"
    // };
    //
    // await sqs.sendMessage(params).promise();


    return response;
};

// Adds CORS headers to responses
const takeAction = middy(takeModelAction).use(cors())
module.exports = {takeAction}




