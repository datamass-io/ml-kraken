const dynamodb = require('../dynamo-utils/dynamodb');

const getModelId = async (taskId) => {
    const params = {
        TableName: process.env.DYNAMODB_MTASK,
        FilterExpression: "#taskId = :taskNo",
        ExpressionAttributeNames:{
            "#taskId": "taskId"
        },
        ExpressionAttributeValues: {
            ":taskNo": taskId
        }
    };

    const modelTask = await dynamodb.scan(params).promise();
    return modelTask.Items[0].modelId;
};

module.exports = {getModelId}