const dynamodb = require('../dynamo-utils/dynamodb');
const middy = require('middy/index');
const { cors } = require('middy/middlewares');
var modelActionLog = require('../models/model-action-log');


const addToActionLogMethod = async (event, context, callback) => {
    console.log(event.body);
    let data = event.body;

    let modelLog = {
        modelId: data.modelId,
        actionId: data.actionId,
        actionType: data.actionType,
        body: data.body
    };

    if (typeof data.modelId === '') {
        console.error('Validation Failed');
        callback(null, {
            statusCode: 400,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: 'Couldn\'t create the todo item.',
        });
        return;
    }

    let model = new modelActionLog(modelLog);
    console.log(model);

    const params = {
        TableName: process.env.DYNAMODB_MACTIONLOG,
        Item: model,
    };

    await dynamodb.put(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(params.Item),
    };
};

// Adds CORS headers to responses
const addToActionLog = middy(addToActionLogMethod).use(cors())
module.exports = {addToActionLog}

