const dynamodb = require('../dynamo-utils/dynamodb');

const getTaskId = async (modelId) => {
    const params = {
        TableName: process.env.DYNAMODB_MTASK,
        FilterExpression: "#modelId = :modelNo",
        ExpressionAttributeNames:{
            "#modelId": "modelId"
        },
        ExpressionAttributeValues: {
            ":modelNo": modelId
        }

    };

    const modelTasks = await dynamodb.scan(params).promise();
    let arraySize = modelTasks.Items.length;
    let finalTask = modelTasks.Items.sort(function(a, b) {
        let dateA = new Date(a.createdAt), dateB = new Date(b.createdAt);
        return dateA - dateB;
    });

    return finalTask[arraySize-1].taskId;
};

module.exports = {getTaskId}