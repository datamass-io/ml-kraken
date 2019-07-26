
'use strict()';

const consumer = async (event, context) => {

    console.log("consumed message: " + event.Records[0].body);


};


module.exports = {consumer}