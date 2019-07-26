
module.exports = function ModelAction(item = {}) {
    const timestamp = new Date().getTime();
    return {
        id: item.id ? item.id : '',
        modelId: item.modelId ? item.modelId : '',
        action: item.action ? item.action : '',
        msgId: item.msgId ? item.msgId : '',
        createdAt: item.createdAt ? item.createdAt : timestamp,
        updatedAt: item.updatedAt ? item.updatedAt : timestamp,
    }
}