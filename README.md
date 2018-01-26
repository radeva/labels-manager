# GitHub Repo Labels Manager

Unifies labels across multiple GitHub repos. Initializes new repo labels.

## How it works?

* Based on a list of repos that needs to be unified in terms of labels and a set of rules, these labels are unified.
Run 
```shell
node main.js --token=<your-token-here>
```

* Initializes brand new repo labels by deleting the default ones and adding lables specified by the rules
Run 

```shell
node init.js --token=<your-token-here> --repo=<org-or-user/repo-name here>
``` 
i.e.

```shell
node init.js --token=<your-token-here> --repo=radeva/test-labels
```

## Configuration

In `config.ts`:

* Replace `<token-here>` with a github token of a user having access to all repos you want to unify. If you don't want to do it in the code, just pass `your-token` as a parameter
* Set `isDryRun` to `true` only if you want to check what will be changed without any changes applied to GitHub. It's `false` by default
* Create labelRules array with the rules to which the labels need to comply to. Example rule configuration:

```
{ 
    from: ['s:critical', 's: critical', 'critical', 'severity: critical'], 
    to: { name: 'severity: critical', color: 'b60205', required: true }
}
```

This means that if there is a label with name equal case-insenstive to any of the names specified in `from`, its name will be updated to `to.name` and its color will be updated to `b60205`. If `required` is `true` and the label doesn't exist in the list after all the updates, it will be added.

* In `repos` array specfy the repos that need to be unified along with the user/organisation to which they belong to. For example: `NativeScript/nativescript-facebook`

## Execution
* In Terminal / Command Prompt run `tsc` to transpile TypeScript to JavaScript 
* Then to update labels across multiple repos according to the specified rules run 
```shell
node main.js --token=<your-token-here>
``` 
* OR to init a brand new repo labels run 
```shell
node init.js --token=<your-token-here> --repo=<org-or-user/repo-name here>
``` 
