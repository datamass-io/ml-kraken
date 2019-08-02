const uuid = require('uuid');
const dynamodb = require('../dynamo-utils/dynamodb');
var modelLog = require('../models/model-log');

const addToLog = async (modelId, log) => {

    let modelMsg = {
        modelId: modelId,
        log: log
    };

    let model = new modelLog(modelMsg);
    console.log(model);

    const params = {
        TableName: process.env.DYNAMODB_MLOG,
        Item: model,
    };

    const dbdata = await dynamodb.put(params).promise();
    return dbdata;
}

module.exports = {addToLog}