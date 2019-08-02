
const modelStatusEnum = require('../models/model-status');

module.exports = function MlModel(item = {}) {
    const timestamp = new Date().getTime();
    return {
        id: item.id ? item.id : '',
        name: item.name ? item.name : '',
        ver: item.ver ? item.ver : '',
        dockerImage: item.dockerImage ? item.dockerImage : '',
        containerMemory: item.containerMemory ? item.containerMemory : '',
        containerCpu: item.containerCpu ? item.containerCpu : '',
        containerPort: item.containerPort ? item.containerPort : '',
        containerIP: item.containerIP ? item.containerIP : '0.0.0.0',
        status: item.status ? item.status : modelStatusEnum.STOPPED,
        user: item.user ? item.user : '',
        createdAt: item.createdAt ? item.createdAt : timestamp,
        updatedAt: item.updatedAt ? item.updatedAt : timestamp,
    }
}