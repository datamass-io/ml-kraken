'use strict';

const uuid = require('uuid');
const dynamodb = require('../dynamo-utils/dynamodb');
var MlModel = require('../models/ml-model');
const middy = require('middy');
const { cors } = require('middy/middlewares');
const logs = require('../dynamo-utils/addToLog');

//module.exports.create = (event, context, callback) => {
const createModel = async (event, context, callback) => {
    console.log(event.body);
    //const data = JSON.parse(event.body);
    const data = event.body;
    if (typeof data.name !== 'string') {
        console.error('Validation Failed');
        callback(null, {
            statusCode: 400,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: 'Couldn\'t create the todo item.',
        });
        return;
    }

    console.log(data);
    let model = new MlModel(data);
    model.id = uuid.v1()
    console.log(model);

    const params = {
        TableName: process.env.DYNAMODB_MMETA,
        Item: model,
    };

    await dynamodb.put(params).promise();
    await logs.addToLog(params.Item.id, "Model created");

    return {
        statusCode: 200,
        body: JSON.stringify(params.Item),
    };

};

// Adds CORS headers to responses
const create = middy(createModel).use(cors())
module.exports = {create}
