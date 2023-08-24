const env = require('dotenv').config().parsed;
const jwt = require('jsonwebtoken');


function verifyAuth(access_token, api_key) {

    if (!isApiKeyValid(api_key)) {
        return {
            error: 'Api Key Failed!',
            message: 'Api key error.'
        };
    }

    return verifyUserToken(access_token)
}

function isApiKeyValid(api_key) {

    return env.API_KEY === api_key;
}

function verifyUserToken(access_token) {

    return jwt.verify(access_token, env.ACCESS_SECRET, (err, user) => {

        if (!access_token) {
            return {
                error: 'User Token Required',
                message: 'Auth Failed!'
            }
        }

        if (err) {
            return {
                error: 'Authentication Failed by Service...',
                message: 'Auth Failed!'
            };
        }

        return {
            success: true,
            message: 'User Verified!',
            user: user
        };

    });


}


module.exports = {verifyAuth };
