
import RepoLabelsManager from './labels-manager'
import { repos, organization } from './config';
let repoLabelsManager: RepoLabelsManager;

for (let repo of repos){
    console.log("Updating " + repo);
    repoLabelsManager = new RepoLabelsManager(repo, organization);
    repoLabelsManager.updateRepoLabels(false);
}