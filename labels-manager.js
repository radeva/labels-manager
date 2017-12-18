"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require('https');
const config_1 = require("./config");
class LabelsManager {
    constructor(repo, organisation) {
        this.repo = repo;
        this.organization = organisation;
    }
    getRepoLabels() {
        let options = {
            path: '/repos/' + this.organization + '/' + this.repo + '/labels',
            method: 'GET'
        };
        let promise = new Promise((resolve, reject) => {
            this.callGitApi(options)
                .then((data) => {
                let labels = JSON.parse(data);
                resolve(labels);
            })
                .catch((err) => {
                console.log(err);
            });
        });
        return promise;
    }
    updateLabelInGitHub(oldLabel, newLabel) {
        let options = {
            path: '/repos/' + this.organization + '/' + this.repo + '/labels/' + encodeURIComponent(oldLabel.name),
            method: 'PATCH',
            payload: JSON.stringify(newLabel)
        };
        return this.callGitApi(options);
    }
    addLabelInGitHub(newLabel) {
        let options = {
            path: '/repos/' + this.organization + '/' + this.repo + '/labels',
            method: 'POST',
            payload: JSON.stringify(newLabel)
        };
        return this.callGitApi(options);
    }
    callGitApi(opt) {
        let options = {
            host: 'api.github.com',
            port: 443,
            path: opt.path,
            method: opt.method,
            headers: {
                'User-Agent': '',
                'Authorization': 'token ' + config_1.token,
                'Content-Length': opt.payload ? opt.payload.length : 0,
                'Content-Type': 'application/json'
            }
        };
        let promise = new Promise((resolve, reject) => {
            const req = https.request(options, (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    resolve(data);
                });
            });
            req.on('error', (err) => {
                reject(err.message);
            });
            if (opt.payload) {
                req.write(opt.payload);
            }
            req.end();
        });
        return promise;
    }
    updateRepoLabels(dryRun = true) {
        this.getRepoLabels()
            .then((currentLabels) => {
            for (let label of currentLabels) {
                this.updateLabel(label, dryRun);
            }
            this.addRequiredLabels(currentLabels, dryRun);
        })
            .catch((err) => {
            console.log(err);
        });
    }
    updateLabel(label, dryRun) {
        let isUpdated = false;
        for (let rule of config_1.labelRules) {
            for (let fromLabel of rule.from) {
                if (label.name.toLowerCase() == fromLabel &&
                    (label.name != rule.to.name || label.color != rule.to.color)) {
                    console.log("Update from " + label.name + ": " + label.color +
                        " to " + rule.to.name + ": " + rule.to.color);
                    if (!dryRun) {
                        this.updateLabelInGitHub(label, { name: rule.to.name, color: rule.to.color });
                    }
                    isUpdated = true;
                    break;
                }
            }
            if (isUpdated) {
                break;
            }
        }
    }
    addRequiredLabels(existingLabels, dryRun) {
        for (let rule of config_1.labelRules) {
            if (!rule.to.required) {
                continue;
            }
            let foundLabel = existingLabels.find(label => label.name == rule.to.name);
            if (!foundLabel) {
                console.log("Add new label " + rule.to.name + ": " + rule.to.color);
                if (!dryRun) {
                    this.addLabelInGitHub({ name: rule.to.name, color: rule.to.color });
                }
            }
        }
    }
}
exports.default = LabelsManager;
//# sourceMappingURL=labels-manager.js.map