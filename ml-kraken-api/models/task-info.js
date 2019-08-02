
const uuid = require('uuid');

module.exports = function TaskInfo(item = {}) {
    const timestamp = new Date().getTime();
    return {
        id: item.id ? item.id : uuid.v1(),
        taskName: item.taskName ? item.taskName : '',
        taskArn: item.taskArn ? item.taskArn : '',
        taskId: item.taskId ? item.taskId : '',
        modelId:  item.modelId ? item.modelId : '',
        createdAt: item.createdAt ? item.createdAt : timestamp,
    }
};

