
'use strict()';
var AWS = require('aws-sdk');
var modelAction = require('../models/model-action');
var MlModel = require('../models/ml-model');
const logs = require('../dynamo-utils/addToLog');
const modelMeta = require('../dynamo-utils/getModelMeta');
const taskInfo = require('../dynamo-utils/addTaskInfo');
const lastTask = require('../dynamo-utils/getLastTaskByModelId');
const taskInfoModel = require('../models/task-info');

const consumer = async (event, context) => {

    console.log("consumed message: " + event.Records[0].body);
    console.log("consumed message: " + JSON.parse(event.Records[0].body).modelId);
    let modelAct = new modelAction(JSON.parse(event.Records[0].body));
    console.log(modelAct);
    var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});
    var ecs = new AWS.ECS({apiVersion: '2014-11-13'});
    var cloudwatchlogs = new AWS.CloudWatchLogs({apiVersion: '2014-03-28'});


    const modelParams = {
        TableName: process.env.DYNAMODB_MMETA,
        Key: {
            id: modelAct.modelId,
        },
    };

    let familyName = 'ml-kraken-models';

    if(modelAct.action === 'run') {

        await logs.addToLog(modelAct.modelId, 'processing SQS message');
        const modelMetaOut = await modelMeta.getModelMeta(modelAct.modelId);
        console.log(modelMetaOut);
        if(typeof modelMetaOut === 'undefined' ){
            return { message: 'Missing modelId!' };
        }
        const modelMetaInfo = new MlModel(modelMetaOut);

        console.log(modelMetaInfo);
        let logName = '/ecs/' + modelMetaInfo.name;

        const searchLogParams = {
            limit: '5',
            logGroupNamePrefix: logName
        };

        const logsCreateParams = {
            logGroupName: logName
        }

        const outSearch = await cloudwatchlogs.describeLogGroups(searchLogParams).promise();

        if (typeof outSearch.logGroups !== 'undefined' && outSearch.logGroups.length === 0) {
            await cloudwatchlogs.createLogGroup(logsCreateParams).promise();
            await logs.addToLog(modelAct.modelId, 'log groups added');
        }

        let params = {
            containerDefinitions: [
                {
                    name: "ml-kraken-container",
                    essential: true,
                    cpu: 0,
                    // image: "655908530487.dkr.ecr.eu-west-1.amazonaws.com/jwszol-nginx:latest",
                    image: modelMetaInfo.dockerImage,
                    memoryReservation: 128,
                    portMappings: [
                        {
                            hostPort: modelMetaInfo.containerPort,
                            protocol: "tcp",
                            containerPort: modelMetaInfo.containerPort,
                        }
                    ],
                    logConfiguration: {
                        logDriver: "awslogs",
                        secretOptions: null,
                        options: {
                            "awslogs-group": logName,
                            "awslogs-region": "eu-west-1",
                            "awslogs-stream-prefix": "ecs"
                        }
                    },
                }
            ],
            networkMode: "awsvpc",
            requiresCompatibilities: ["FARGATE"],
            family: modelMetaInfo.name,
            cpu: "256",
            memory: "512",
            taskRoleArn: process.env.TaskExecutionRoleArn,
            executionRoleArn: process.env.TaskExecutionRoleArn,
            volumes: []
        };

        const task = await ecs.registerTaskDefinition(params).promise();
        console.log(task);

        await logs.addToLog(modelAct.modelId, 'task definition added');
        await logs.addToLog(modelAct.modelId, JSON.stringify(task));

        let taskName = task.taskDefinition.family + ":" + task.taskDefinition.revision;
        var paramsSecurityGroup = {
            Description: 'ml-kraken-sec',
            GroupName: taskName + "-" + Math.random().toString(36).substring(7),
            VpcId: process.env.VPC
        };

        const secGroup = await ec2.createSecurityGroup(paramsSecurityGroup).promise();

        var paramsIngress = {
            GroupId: secGroup.GroupId,
            IpPermissions:[
                {
                    IpProtocol: "tcp",
                    FromPort: modelMetaInfo.containerPort,
                    ToPort: modelMetaInfo.containerPort,
                    IpRanges: [{"CidrIp":"0.0.0.0/0"}]
                },
            ]
        };

        await ec2.authorizeSecurityGroupIngress(paramsIngress).promise();

        await logs.addToLog(modelAct.modelId, 'sec group was added');
        await logs.addToLog(modelAct.modelId, JSON.stringify(secGroup));

        let taskParams = {
            cluster: process.env.ECS_CLUSTER,
            taskDefinition: taskName,
            launchType: "FARGATE",
            networkConfiguration: {
                awsvpcConfiguration: {
                    subnets: [process.env.PublicSubnet],
                    assignPublicIp: "ENABLED",
                    securityGroups: [
                        secGroup.GroupId
                    ],
                }
            }
        };




        const taskRun = await ecs.runTask(taskParams).promise();
        console.log(taskRun);

        await logs.addToLog(modelAct.modelId, 'task started');
        await logs.addToLog(modelAct.modelId, JSON.stringify(taskRun));
        let taskId = taskRun.tasks[0].taskArn.split('/')[1];


        let taskSum = new taskInfoModel({
            taskName: task.taskDefinition.family + ":" + task.taskDefinition.revision,
            taskArn: task.taskDefinition.taskDefinitionArn,
            taskId: taskId,
            modelId: modelAct.modelId,
        })

        console.log(taskSum);
        
        await taskInfo.addTaskInfo(taskSum);
        //let taskName = task.taskDefinition.family + ":" + task.taskDefinition.revision;
    }

    if(modelAct.action === 'stop') {

        await logs.addToLog(modelAct.modelId, 'processing SQS message');
        const modelMetaOut = await modelMeta.getModelMeta(modelAct.modelId);
        console.log(modelMetaOut);
        if (typeof modelMetaOut === 'undefined') {
            return {message: 'Missing modelId!'};
        }
        const modelMetaInfo = new MlModel(modelMetaOut);

        const taskId = await lastTask.getTaskId(modelMetaInfo.id);
        console.log(taskId);

        var stopTaskParams = {
            task: taskId,
            cluster: process.env.ECS_CLUSTER
        };

        await ecs.stopTask(stopTaskParams).promise();
    }




    };


module.exports = {consumer}