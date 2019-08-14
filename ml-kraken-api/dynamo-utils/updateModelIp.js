const dynamodb = require('../dynamo-utils/dynamodb');
var mlModel = require('../models/ml-model');

const updateIp = async (modelId, ip) => {
    const timestamp = new Date().getTime();
    const params = {
        TableName: process.env.DYNAMODB_MMETA,
        Key: {
            id: modelId,
        },
        ExpressionAttributeNames: {
            '#con_ip': 'containerIP'
        },
        ExpressionAttributeValues: {
            ':ip': ip,
            ':updatedAt': timestamp
        },
        UpdateExpression: 'SET #con_ip = :ip, updatedAt = :updatedAt',
        ReturnValues: 'ALL_NEW',
    };
    const body = await dynamodb.update(params).promise();
    return body;
};

module.exports = {updateIp}
