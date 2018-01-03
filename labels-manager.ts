
const https = require('https');
const url = require('url');
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
                    console.error(err);
                    reject(err);
                });
        });

        return promise;
    }
    
    updateLabelInGitHub(oldLabel: Label, newLabel: any) : Promise<any> {
        let options = {
            path: '/repos/' + this.organization + '/' + this.repo + '/labels/' + encodeURIComponent(oldLabel.name),
            method: 'PATCH',
            payload: JSON.stringify(newLabel)
        };

        return this.callGitApi(options);
    }

    addLabelInGitHub(newLabel: any) : Promise<any> {
        let options = {
            path: '/repos/' + this.organization + '/' + this.repo + '/labels',
            method: 'POST',
            payload: JSON.stringify(newLabel)
        };

        return this.callGitApi(options);
    }

    callGitApi(opt, prevData = null, originalPromiseResolve = null, originalPromiseReject = null) : Promise<any> {
        let that = this;
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

        let promise = new Promise<any>((resolve, reject) => {
            const req = https.request(options, (resp) => {
                //console.log('statusCode:', resp.statusCode);
                //console.log('headers:', resp.headers);
                let nextLinkPath = null;
                if(options.method == 'GET'){
                    nextLinkPath = that.getNextLinkPath(resp.headers.link);
                }
                
                let data = '';
                // A chunk of data has been recieved.
                resp.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    if (prevData) {
                        let prevDataObject = JSON.parse(prevData);
                        let dataObject = JSON.parse(data);
                        prevData = JSON.stringify(prevDataObject.concat(dataObject));
                    } else {
                        prevData = data;
                    }

                    if(!originalPromiseResolve) {
                        originalPromiseResolve = resolve;
                    }

                    if(!originalPromiseReject) {
                        originalPromiseReject = reject;
                    }

                    if (nextLinkPath) {
                        options.path = nextLinkPath;
                        that.callGitApi(options, prevData, originalPromiseResolve, originalPromiseReject);
                    } else {
                        originalPromiseResolve(prevData);
                    } 
                });
            });
            
            req.on('error', (err) => {
                originalPromiseReject(err.message);
            });

            if(opt.payload) {
                req.write(opt.payload);
            }
            
            req.end();
        });
        
        return promise;
    }

    getNextLinkPath(linkHeader) {
        // <https://api.github.com/repositories/55508736/labels?page=2>; rel="next", <https://api.github.com/repositories/55508736/labels?page=2>; rel="last"
        if (linkHeader) {
            let linkHeaderParts = linkHeader.split(',');
            if(linkHeaderParts) {
                let nextLinkHeaderPart = linkHeaderParts.find(part => part.indexOf('rel="next"') != -1);
                if(nextLinkHeaderPart) {
                    let nextLinkParts = nextLinkHeaderPart.split(';');
                    
                    if(nextLinkParts && nextLinkParts.length == 2) {
                        let nextLink = nextLinkParts[0].replace('<', '').replace('>', '');
                        let q = url.parse(nextLink);
                        let nextLinkPath = nextLink.replace("https://" + q.host, '');
                        return nextLinkPath;
                    }
                }
                
            }
        }

        return null;
    }
    
    public updateRepoLabels(dryRun:boolean = true) {        
        let that = this; 
        that.getRepoLabels()
            .then((currentLabels) => {   
                let promises = []
                // update existing labels
                for (let label of currentLabels){
                    let currentPromise = that.updateLabel(label, dryRun);
                    if(currentPromise != null) {
                        promises.push(currentPromise);
                    }
                }

                return Promise.all(promises);
            })
            .then(() => that.getRepoLabels())
            .then((currentLabels) => that.addRequiredLabels(currentLabels, dryRun))
            .catch((err) => {
                console.error("Repo " + that.repo + ", Error:" + err);
            });
    }

    updateLabel(label:Label, dryRun: boolean){
        let isUpdated = false;
        let that = this;
        for(let rule of labelRules) {
            for(let fromLabel of rule.from) {
                if(label.name.toLowerCase() == fromLabel && 
                    (label.name != rule.to.name || label.color != rule.to.color)) {
                    console.log(that.repo + ": Update from " + label.name + ": " + label.color 
                    + " to " + rule.to.name + ": " + rule.to.color);
                    if(!dryRun){
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

        return null;
    }

    addRequiredLabels(existingLabels: Array<Label>, dryRun: boolean) {
        for(let rule of labelRules) {
            if(!rule.to.required) {
                continue;
            }

            let foundLabel = existingLabels.find(label => label.name == rule.to.name);
            let that = this;
            if( !foundLabel ) {
                console.log(that.repo + ": Add new label " + rule.to.name + ": " + rule.to.color);

                if(!dryRun){
                    this.addLabelInGitHub({ name: rule.to.name, color: rule.to.color })
                }
            }
        }
    }
}