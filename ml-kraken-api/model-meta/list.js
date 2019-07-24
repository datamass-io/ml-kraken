'use strict';

const dynamodb = require('../dynamo-utils/dynamodb');
const middy = require('middy');
const { cors } = require('middy/middlewares');

const listModels = (event, context, callback) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
    };

    // fetch all todos from the database
    dynamodb.scan(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch the todo item.',
            });
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
        callback(null, response);
    });
};

// Adds CORS headers to responses
const list = middy(listModels).use(cors())
module.exports = {list}
