import RepoLabelsManager from './managers/labels-manager';
import TokenManager from './managers/token-manager';
import { repos, isDryRun } from './config';


let tokenManager = new TokenManager();
tokenManager.initToken(main);

function main(token){
    let repoLabelsManager: RepoLabelsManager;

    for (let repo of repos){
        console.log("Updating " + repo);
        repoLabelsManager = new RepoLabelsManager(token, repo);
        repoLabelsManager.updateRepoLabels(isDryRun);
    }
}

