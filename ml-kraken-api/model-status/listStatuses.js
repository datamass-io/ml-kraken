const dynamodb = require('../dynamo-utils/dynamodb');
const middy = require('middy/index');
const { cors } = require('middy/middlewares');

const listStatus = async (event, context) => {

    const params = {
        TableName: process.env.DYNAMODB_MSTATUS,
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
const listStatuses = middy(listStatus).use(cors())
module.exports = {listStatuses}
