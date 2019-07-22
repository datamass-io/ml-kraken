
module.exports = function MlModel(item = {}) {
    const timestamp = new Date().getTime();
    return {
        id: item.id ? item.id : '',
        name: item.name ? item.name : '',
        ver: item.ver ? item.ver : '',
        uri: item.uri ? item.uri : '',
        user: item.user ? item.user : '',
        createdAt: item.createdAt ? item.createdAt : timestamp,
        updatedAt: item.updatedAt ? item.updatedAt : timestamp,
    }
}