const dynamodb = require('../dynamo-utils/dynamodb');
const middy = require('middy/index');
const { cors } = require('middy/middlewares');

const listActionLogsMet = async (event, context) => {

    const params = {
        TableName: process.env.DYNAMODB_MACTIONLOG,
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
const listActionLog = middy(listActionLogsMet).use(cors())
module.exports = {listActionLog}
