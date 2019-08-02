
const uuid = require('uuid');

module.exports = function ModelLog(item = {}) {
    const timestamp = new Date().getTime();
    return {
        id: item.id ? item.id : uuid.v1(),
        modelId: item.modelId ? item.modelId : '',
        log: item.log ? item.log : '',
        createdAt: item.createdAt ? item.createdAt : timestamp,
    }
};

