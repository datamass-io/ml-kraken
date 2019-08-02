const dynamodb = require('../dynamo-utils/dynamodb');
var mlModel = require('../models/ml-model');

const updateStatus = async (modelId, status) => {
    const timestamp = new Date().getTime();

    const params = {
        TableName: process.env.DYNAMODB_MMETA,
        Key: {
            id: modelId,
        },
        ExpressionAttributeNames: {
            '#model_status': 'status'
        },
        ExpressionAttributeValues: {
            ':status': status,
            ':updatedAt': timestamp
        },
        UpdateExpression: 'SET #model_status = :status, updatedAt = :updatedAt',
        ReturnValues: 'ALL_NEW',
    };
    const body = await dynamodb.update(params).promise();
    return body;
};
module.exports = {updateStatus}