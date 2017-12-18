
import LabelsManager from './labels-manager'
let labelsManager: LabelsManager;
let repos = [
    'nativescript-facebook',
    'nativescript-camera',
    'nativescript-imagepicker',
    'nativescript-dev-sass',
    'nativescript-dev-less',
    'nativescript-background-http',
    'nativescript-geolocation',
    'nativescript-fresco',
    'push-plugin'
]


for (let repo of repos){
    console.log("Updating " + repo);
    labelsManager = new LabelsManager(repo, 'NativeScript');
    labelsManager.updateRepoLabels(false);
}