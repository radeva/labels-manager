
import RepoLabelsManager from './labels-manager'
import { repos } from './config';
let repoLabelsManager: RepoLabelsManager;

for (let repo of repos){
    console.log("Updating " + repo);
    repoLabelsManager = new RepoLabelsManager(repo, 'NativeScript');
    repoLabelsManager.updateRepoLabels(false);
}