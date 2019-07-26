'use strict';

const dynamodb = require('../dynamo-utils/dynamodb');
let MlModel = require('../models/ml-model');
const middy = require('middy');
const { cors } = require('middy/middlewares');

const updateModel = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = event.body;
    let model = new MlModel(event.body);

    // validation
    if (typeof data.name !== 'string' || typeof data.ver !== 'string') {
        console.error('Validation Failed');
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t update the todo item.',
        });
        return;
    }

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.path.id,
        },
        ExpressionAttributeNames: {
            '#model_name': 'name',
            '#model_user' : 'user',
        },
        ExpressionAttributeValues: {
            ':name': model.name,
            ':ver': model.ver,
            ':uri': model.uri,
            ':user': model.user,
            ':updatedAt': timestamp,
        },
        UpdateExpression: 'SET #model_name = :name, ver = :ver, uri = :uri, #model_user = :user, updatedAt = :updatedAt',
        ReturnValues: 'ALL_NEW',
    };

    // update the todo in the database
    dynamodb.update(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t update the todo item.',
            });
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        };
        callback(null, response);
    });
};

// Adds CORS headers to responses
const update = middy(updateModel).use(cors())
module.exports = {update}
