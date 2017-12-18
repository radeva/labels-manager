"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const labels_manager_1 = require("./labels-manager");
let labelsManager;
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
];
for (let repo of repos) {
    console.log("Updating " + repo);
    labelsManager = new labels_manager_1.default(repo, 'NativeScript');
    labelsManager.updateRepoLabels(false);
}
//# sourceMappingURL=labels-updater.js.map