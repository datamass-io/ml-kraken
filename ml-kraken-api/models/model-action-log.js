
const uuid = require('uuid');

module.exports = function ModelActionLog(item = {}) {
    const timestamp = new Date().getTime();
    return {
        id: item.id ? item.id : uuid.v1(),
        modelId: item.modelId ? item.modelId : '',
        actionId: item.actionId ? item.actionId : '',
        actionType: item.actionType ? item.actionType : '',
        body: item.body ? item.body : '',
        createdAt: item.createdAt ? item.createdAt : timestamp,
    }
};

