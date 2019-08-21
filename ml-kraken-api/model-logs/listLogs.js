const dynamodb = require('../dynamo-utils/dynamodb');
const middy = require('middy/index');
const { cors } = require('middy/middlewares');

const listAllLogs = async (event, context) => {

    const params = {
        TableName: process.env.DYNAMODB_MLOG,
        ExpressionAttributeValues: {
            ':modelId': event.path.id,
        },
        FilterExpression: 'modelId = :modelId'
    };

    const statuses = await dynamodb.scan(params).promise();
    const response = {
        statusCode: 200,
        body: JSON.stringify(statuses.Items),
    };

    return response;
}

// Adds CORS headers to responses
const listLogs = middy(listAllLogs).use(cors())
module.exports = {listLogs}
