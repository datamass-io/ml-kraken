'use strict';

global.fetch = require('node-fetch');

var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
var CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;

var AWS = require('aws-sdk');
var cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const createUser  = async (event, context, callback) => {

    var UserPoolId = '';
    var ClientId = '';

    // Get UserPool ID

    var params = {
        MaxResults: 1,
    };

    await cognitoIdentityServiceProvider.listUserPools(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            UserPoolId = data.UserPools[0].Id;
        }
    }).promise();

    // Check if admin account is already created

    params = {
        UserPoolId: UserPoolId
    };

    var accountCreated = false;

    await cognitoIdentityServiceProvider.listUsers(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            accountCreated = data.Users.some(user => {
                return user.Username === 'admin';
            });
        }
    }).promise();

    if (!accountCreated) {
        params = {
            UserPoolId: UserPoolId,
            MaxResults: 1
        };
    
        await cognitoIdentityServiceProvider.listUserPoolClients(params, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                ClientId = data.UserPoolClients[0].ClientId;
            }
        }).promise();
    
        // Define AWS Cognito User Pool
    
        var poolData = {
            "UserPoolId": UserPoolId,
            "ClientId": ClientId
        };
        var userPool = new CognitoUserPool(poolData);
    
        //  Define User Attributes
        var attributeList = [];
    
        // Create User
        await new Promise((resolve, reject) => {
            userPool.signUp('admin', 'admin1', attributeList, null, (err, result) => {
                if (err) {
                    console.log('Error: ', err.errorMessage);
                    callback(err, null);
                    reject(false);
                } else {
                    var cognitoUser = result.user;
                    console.log('Created user: ' + cognitoUser.getUsername());
                    resolve(true);
                }
            });
        });
    
        // Confirm newly created user
    
        params = {
            "Username": 'admin',
            "UserPoolId": UserPoolId
        };
    
        await cognitoIdentityServiceProvider.adminConfirmSignUp(params, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(data);
                callback(null, data);
            }
        }).promise();
    } else {
        console.log('Admin user already exists');
    }
};

module.exports = {createUser}