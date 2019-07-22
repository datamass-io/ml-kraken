'use strict';

const uuid = require('uuid');
const dynamodb = require('../dynamo-utils/dynamodb');
var MlModel = require('../models/ml-model');

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    console.log(event.body);
    const data = JSON.parse(event.body);
    if (typeof data.name !== 'string') {
        console.error('Validation Failed');
        callback(null, {
            statusCode: 400,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t create the todo item.',
        });
        return;
    }

    console.log(data);
    let model = new MlModel(data);
    model.id = uuid.v1()
    console.log(model);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: model,
    };

    // write the todo to the database
    dynamodb.put(params, (error) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t create the todo item.',
            });
            return;
        }

        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
        callback(null, response);
    });
};
