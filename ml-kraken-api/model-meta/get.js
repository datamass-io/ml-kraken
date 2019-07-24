'use strict';

const dynamodb = require('../dynamo-utils/dynamodb');
const middy = require('middy');
const { cors } = require('middy/middlewares');


const getModel = (event, context, callback) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
    };

    // fetch todo from the database
    dynamodb.get(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            return {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch the todo item.',
            };
        }

        // create a response
        const response = {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(result.Item),
        };

        callback(null, response);
    });
};

// Adds CORS headers to responses
const get = middy(getModel).use(cors())
module.exports = {get}
