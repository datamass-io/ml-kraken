const dynamodb = require('../dynamo-utils/dynamodb');

const getModelMeta = async (modelId) => {

    const params = {
        TableName: process.env.DYNAMODB_MMETA,
        Key: {
            id: modelId,
        },
    };

    const modelMeta = await dynamodb.get(params).promise();
    return modelMeta.Item;
};

module.exports = {getModelMeta}



