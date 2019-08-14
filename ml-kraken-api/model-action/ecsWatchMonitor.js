var AWS = require('aws-sdk');
const modelTask = require('../dynamo-utils/getModelIdByTaskId');
const modelStatus = require('../dynamo-utils/updateModelStatus');
const modelStatusEnum = require('../models/model-status');
const modelIp = require('../dynamo-utils/updateModelIp');

const ecsCloudWatch = async (event, context) => {
    console.log(event);
    if(event.detail.desiredStatus === "RUNNING" && event.detail.lastStatus === "RUNNING"){
        console.log(event);
        let taskId = event.resources[0].split('/')[1];
        console.log(taskId);
        const modelId = await modelTask.getModelId(taskId);
        console.log(modelId);
        await modelStatus.updateStatus(modelId, modelStatusEnum.RUNNING);
        var ecs = new AWS.ECS({apiVersion: '2014-11-13'});
        var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

        const params = {
            tasks: [
                taskId
            ],
            cluster: process.env.ECS_CLUSTER
        };

        let taskOut = await ecs.describeTasks(params).promise();
        let networkInterfaceId = taskOut.tasks[0].attachments[0].details.filter(function(str) { return str.name.includes("networkInterfaceId") })[0].value;

        const networkParams = {
            NetworkInterfaceIds: [
                networkInterfaceId
            ]
        };

        let interfaceInfo =await ec2.describeNetworkInterfaces(networkParams).promise();
        let publicIp = interfaceInfo.NetworkInterfaces[0].Association.PublicIp;
        await modelIp.updateIp(modelId, publicIp);

    }
};


module.exports = {ecsCloudWatch}
