/*
*
* Init labels of a new repository.
* NOTE: All existing labels will be DELETED!
*
*/

import RepoLabelsManager from './managers/labels-manager';
import TokenManager from './managers/token-manager';
import { isDryRun } from './config'

let minimist = require('minimist');

let tokenManager = new TokenManager();
tokenManager.initToken(main);

function main(token) {
    var argv = minimist(process.argv.slice(2));
    let repo = argv.repo;
    
    let repoLabelsManager = new RepoLabelsManager(token, repo);
    repoLabelsManager.initRepoLabels(isDryRun);
}
