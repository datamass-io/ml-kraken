const middy = require('middy');
const { cors } = require('middy/middlewares');
var AWS = require('aws-sdk');
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});
var modelAction = require('../models/model-action');
const modelLog = require('../models/model-log');
const logs = require('../dynamo-utils/addToLog');
const modelMeta = require('../dynamo-utils/getModelMeta');
const modelStatus = require('../dynamo-utils/updateModelStatus');
const modelStatusEnum = require('../models/model-status');

const takeModelAction = async (event, context) => {

    const data = event.body;
    const modelId = data.modelId;
    const action = data.action;

    let model = new modelAction(data);
    const modelMetaInfo = await modelMeta.getModelMeta(modelId);
    console.log(modelMetaInfo);

    if(action === 'run'){
        await logs.addToLog(modelId, 'scheduled to run');
    }

    if(action === 'stop'){
        await logs.addToLog(modelId, 'scheduled to stop');
    }

    let queueParams = {
        DelaySeconds: 1,
        MessageBody: JSON.stringify(model),
        QueueUrl: process.env.SQS_URL
        //QueueUrl: 'http://0.0.0.0:9324/queue/default'
    };
    const qbody = await sqs.sendMessage(queueParams).promise();
    await logs.addToLog(modelId, 'Msg added to queue ' + qbody.MessageId);

    await modelStatus.updateStatus(modelId, modelStatusEnum.PENDING);
    await logs.addToLog(modelId, 'Model status changed to PENDING');

    const response = {
        statusCode: 200,
        body: JSON.stringify({qbody}),
    };

    return response;
};

// Adds CORS headers to responses
const takeAction = middy(takeModelAction).use(cors())
module.exports = {takeAction}




