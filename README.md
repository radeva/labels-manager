# Labels Manager

Managers/Unifies labels across multiple github repos
NOTE: No labels are deleted!

## How it works?

Based on a list of repos that needs to be unified in terms of labels and a set of rules, these labels are unified.

## Configuration

In `config.ts`:

* Replace `<token-here>` with a github token of a user having access to all repos you want to unify
* Create labelRules array with the rules to which the labels need to comply to. Example rule configuration:

```
{ 
    from: ['s:critical', 's: critical', 'critical', 'severity: critical'], 
    to: { name: 'severity: critical', color: 'b60205', required: true }
}
```

This means that if there is a label with name equal case-insenstive to any of the names specified in `from`, its name will be updated to `to.name` and its color will be updated to `b60205`. If `required` is `true` and the label doesn't exist in the list after all the updates, it will be added.

* In `repos` array specfy the repos that need to be unified
* Set value for repos `organization`



In `labels-updater.ts` you can set if the run is dry or not. If a dry run, then messages are displayed what will be changed. Otherwise the changes are applied to the repo. To set a dry run make sure to call `updateRepoLabels` with `true`.

## Execution
Run in Terminal / Command Prompt `tsc` to transpile TypeScript to JavaScript and then run `node labels-updater.js`


