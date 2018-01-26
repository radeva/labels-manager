
const https = require('https');
import Label from './label';
import { token, labelRules } from './config';

export default class RepoLabelsManager 
{
    repo: string
    organization: string
    constructor(repo:string, organization: string) {
        this.repo = repo;
        this.organization = organization;
    }    
    
    public getRepoLabels() : Promise<Array<Label>> {
        let options = {
            path: '/repos/' + this.organization + '/' + this.repo + '/labels',
            method: 'GET'
        };
        
        let promise = new Promise<Array<Label>>((resolve, reject) => {
            this.callGitApi(options)
                .then((data) => {
                    let labels = JSON.parse(data) as Array<Label>;
                    //console.log(labels);
                    resolve(labels);
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        return promise;
    }
    
    updateLabelInGitHub(oldLabel: Label, newLabel: any) {
        let options = {
            path: '/repos/' + this.organization + '/' + this.repo + '/labels/' + encodeURIComponent(oldLabel.name),
            method: 'PATCH',
            payload: JSON.stringify(newLabel)
        };

        return this.callGitApi(options);
    }

    addLabelInGitHub(newLabel: any) {
        let options = {
            path: '/repos/' + this.organization + '/' + this.repo + '/labels',
            method: 'POST',
            payload: JSON.stringify(newLabel)
        };

        return this.callGitApi(options);
    }

    callGitApi(opt) : Promise<any> {

        let options = {
            host: 'api.github.com',
            port: 443,
            path: opt.path,
            method: opt.method,
            headers: { 
                'User-Agent': '',
                'Authorization': 'token ' + token,
                'Content-Length': opt.payload ? opt.payload.length : 0,
                'Content-Type': 'application/json'
            }
        };

        let promise = new Promise((resolve, reject) => {
            const req = https.request(options, (resp) => {
                //console.log('statusCode:', resp.statusCode);
                //console.log('headers:', resp.headers);

                let data = '';
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    resolve(data);
                });
              });
              
              req.on('error', (err) => {
                reject(err.message);
              });

              if(opt.payload) {
                req.write(opt.payload);
              }
              
              req.end();
        });
        
        return promise;
    }
    
    public updateRepoLabels(dryRun:boolean = true) {        
        let that = this;  
        that.getRepoLabels()
            .then((currentLabels) => {   
                let promises = []
                // update existing labels
                for (let label of currentLabels){
                    promises.push(that.updateLabel(label, dryRun));
                }

                return Promise.all(promises);
            })
            .then(() => that.getRepoLabels())
            .then((currentLabels) => that.addRequiredLabels(currentLabels, dryRun))
            .catch((err) => {
                console.log(err);
            });
    }

    updateLabel(label:Label, dryRun: boolean){
        let isUpdated = false;
        for(let rule of labelRules) {
            for(let fromLabel of rule.from) {
                if(label.name.toLowerCase() == fromLabel && 
                    (label.name != rule.to.name || label.color != rule.to.color)) {
                    console.log("Update from " + label.name + ": " + label.color 
                    + " to " + rule.to.name + ": " + rule.to.color);
                    if(!dryRun){
                        console.log("update");
                        return this.updateLabelInGitHub(label, { name: rule.to.name, color: rule.to.color });
                    }
                    
                    isUpdated = true;
                    break;
                }
            }

            if(isUpdated) {
                break;
            }
        }
    }

    addRequiredLabels(existingLabels: Array<Label>, dryRun: boolean) {
        for(let rule of labelRules) {
            if(!rule.to.required) {
                continue;
            }

            let foundLabel = existingLabels.find(label => label.name == rule.to.name);
            if( !foundLabel ) {
                console.log("Add new label " + rule.to.name + ": " + rule.to.color);

                if(!dryRun){
                    this.addLabelInGitHub({ name: rule.to.name, color: rule.to.color })
                }
            }
        }
    }
}