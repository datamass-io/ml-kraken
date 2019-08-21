
const dynamodb = require('../dynamo-utils/dynamodb');
var taskInfoModel = require('../models/task-info');

const addTaskInfo = async (taskInfo) => {

    let model = new taskInfoModel(taskInfo);
    console.log(model);

    const params = {
        TableName: process.env.DYNAMODB_MTASK,
        Item: model,
    };

    const dbdata = await dynamodb.put(params).promise();
    return dbdata;
};

module.exports = {addTaskInfo}