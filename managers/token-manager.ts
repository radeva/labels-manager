let prompt = require('prompt');
let minimist = require('minimist');
import { token } from './../config';

export default class TokenManager{

    initToken (callback) {
        //
        // Try getting arguments
        //
        var argv = minimist(process.argv.slice(2));
        let currentToken = argv.token;

        if(!currentToken){
            currentToken = token;
        }

        //
        // Start the prompt
        //
        if(!currentToken) {
            prompt.start();
            prompt.get([{
                name: 'token',
                description: 'Please, enter GitHub token',
                type: 'string',
                required: true
            }], function (err, result) {
                callback(result.token);
            });   
        } else {
            callback(currentToken);
        }
    }
}