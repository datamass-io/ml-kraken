
const dynamodb = require('../dynamo-utils/dynamodb');
const middy = require('middy');
const { cors } = require('middy/middlewares');
var AWS = require('aws-sdk');


const taskDef = async (event, context) => {
    var ecs = new AWS.ECS({apiVersion: '2014-11-13'});
    var cloudwatchlogs = new AWS.CloudWatchLogs({apiVersion: '2014-03-28'});

    let familyName = 'ml-kraken-models';
    let logName = '/ecs/' + familyName;

    var searchLogParams = {
        limit: '5',
        logGroupNamePrefix: logName
    };

    var logsCreateParams = {
        logGroupName: logName
    }

    const outSearch = await cloudwatchlogs.describeLogGroups(searchLogParams).promise();

    if(typeof outSearch.logGroups !== 'undefined' && outSearch.logGroups.length === 0) {
        await cloudwatchlogs.createLogGroup(logsCreateParams).promise();
    }

    var params = {
        containerDefinitions: [
            {
                name: "ml-kraken-container",
                essential: true,
                cpu: 0,
                image: "655908530487.dkr.ecr.eu-west-1.amazonaws.com/jwszol-nginx:latest",
                "portMappings": [
                    {
                        "hostPort": 80,
                        "protocol": "tcp",
                        "containerPort": 80,
                    }
                ],
                "logConfiguration": {
                    "logDriver": "awslogs",
                    "secretOptions": null,
                    "options": {
                        "awslogs-group": logName,
                        "awslogs-region": "eu-west-1",
                        "awslogs-stream-prefix": "ecs"
                    }
                },
            }
        ],
        networkMode: "awsvpc",
        requiresCompatibilities: ["FARGATE"],
        family: familyName,
        cpu: "256",
        memory: "512",
        taskRoleArn: process.env.TaskExecutionRoleArn,
        executionRoleArn: process.env.TaskExecutionRoleArn,
        volumes: [
        ]
    };


    const task = await ecs.registerTaskDefinition(params).promise();
    console.log(task);

    let taskName = task.taskDefinition.family+":"+task.taskDefinition.revision;
    var taskParams = {
        cluster: "ml-kraken-dev",
        taskDefinition: taskName,
        launchType: "FARGATE",
        networkConfiguration: {
            awsvpcConfiguration: {
                subnets: [process.env.PublicSubnet],
                assignPublicIp: "ENABLED",
            }
        }
    };
    const taskRun = await ecs.runTask(taskParams).promise();
    console.log(taskRun);

    const response = {
        statusCode: 200,
        body: JSON.stringify({task,taskRun}),
    };

    return response;
};


// Adds CORS headers to responses
const taskDefinition = middy(taskDef).use(cors())
module.exports = {taskDefinition}
