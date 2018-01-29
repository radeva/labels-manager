export const token = null; // your github token here
export const isDryRun = false; // set isDryRun to true and you will see only what will be changed, but no changes will be applied to GitHub

export const labelRules = [
    {
        from: ['bug'],
        to: { name: 'bug', color: 'ee0701', required: true }
    },
    {
        from: ['feature'],
        to: { name: 'feature', color: '0B61A4', required: true }
    },
    {
        from: ['documentation', 'docs'],
        to: { name: 'docs', color: '0B61A4', required: true }
    },
    {
        from: ['good first issue'],
        to: { name: 'good first issue', color: '7057ff', required: true }
    },
    {
        from: ['help wanted'],
        to: { name: 'help wanted', color: '33aa3f', required: true }
    },
    {
        from: ['s:critical', 's: critical', 'critical', 'severity: critical'],
        to: { name: 'severity: critical', color: 'b60205', required: true }
    },
    {
        from: ['s:high', 's: high', 'severity: high'],
        to: { name: 'severity: high', color: 'ee0701', required: true }
    },
    {
        from: ['s:medium', 's: medium', 'severity: medium', 's:med'],
        to: { name: 'severity: medium', color: 'ff9933', required: true }
    },
    {
        from: ['s:low', 's: low', 'minor', 'severity: low'],
        to:  { name: 'severity: low', color: 'fef2c0', required: true }
    },
    {
        from: ['need more info', 'needs more info'],
        to: { name: 'needs more info', color: 'fbca04', required: true }
    },
    {
        from: ['question'],
        to: { name: 'question', color: 'cc317c', required: true }
    },
    {
        from: ['backlog', '0 - Backlog'],
        to: { name: 'backlog', color: 'ededed', required: true }
    },
    {
        from: ['android', 'os:android', 'os: android'],
        to: { name: 'os: android', color: '006b75', required: true }
    },
    {
        from: ['ios', 'os:ios', 'os: ios'],
        to: { name: 'os: ios', color: '006b75', required: true }
    },
    {
        from: ['windows', 'os: windows', 'os:windows'],
        to: { name: 'os: windows', color: '006b75', required: true }
    },
    {
        from: ['linux', 'os: linux', 'os:linux'],
        to: { name: 'os: linux', color: '006b75', required: true }
    },
    {
        from: ['Mac', 'os: mac', 'os:mac'],
        to: { name: 'os: mac', color: '006b75', required: true }
    },
    {
        from: ['breaking-change', 'breaking change'],
        to: { name: 'breaking-change', color: 'd93f0b', required: true }
    },
    {
        from: ['sev1'],
        to: { name: 'support: sev1', color: '8f563f', required: true }
    },
    {
        from: ['sev2'],
        to: { name: 'support: sev2', color: '8f563f', required: true }
    },
    {
        from: ['sev3'],
        to: { name: 'support: sev3', color: '8f563f', required: true }
    },
    {
        from: ['Done', '3 - Done'],
        to: { name: 'done', color: 'ededed', required: true }
    },
    {
        from: ['In Progress', '2 - Working'],
        to: { name: 'in progress', color: 'ededed', required: true }
    },
    {
        from: ['Planned'],
        to: { name: 'planned', color: 'ededed', required: true }
    },
    {
        from: ['Ready For Test', 'in review', '1 - Ready'],
        to: { name: 'ready for test', color: 'ededed', required: true }
    },
    {
        from: ['ac needed'],
        to: { name: 'ac needed', color: 'ededed', required: false }
    },
    {
        from: ['ready for release'],
        to: { name: 'ready for release', color: 'ededed', required: false }
    }

]

const NativeScriptOrg = 'NativeScript';
const TelerikOrg = 'telerik';

export const repos = [
    // Plugins
    NativeScriptOrg + '/nativescript-facebook',
    NativeScriptOrg + '/nativescript-camera',
    NativeScriptOrg + '/nativescript-imagepicker',
    NativeScriptOrg + '/nativescript-dev-sass',
    NativeScriptOrg + '/nativescript-dev-less',
    NativeScriptOrg + '/nativescript-background-http',
    NativeScriptOrg + '/nativescript-geolocation',
    NativeScriptOrg + '/nativescript-fresco',
    NativeScriptOrg + '/push-plugin',
    NativeScriptOrg + '/nativescript-plugin-seed',
    NativeScriptOrg + '/marketplace-feedback',
    NativeScriptOrg + '/nsplugins-internal',
    TelerikOrg + '/nativescript-ui-feedback',
    // Templates
    NativeScriptOrg + '/template-hello-world-ng',
    NativeScriptOrg + '/template-hello-world',
    NativeScriptOrg + '/template-hello-world-ts',
    NativeScriptOrg + '/template-drawer-navigation-ng',
    NativeScriptOrg + '/template-drawer-navigation-ts',
    NativeScriptOrg + '/template-drawer-navigation',
    NativeScriptOrg + '/template-master-detail-ng',
    NativeScriptOrg + '/template-master-detail',
    NativeScriptOrg + '/template-master-detail-ts',
    NativeScriptOrg + '/template-tab-navigation-ng',
    NativeScriptOrg + '/template-tab-navigation',
    NativeScriptOrg + '/template-tab-navigation-ts',
    NativeScriptOrg + '/nativescript-template-ng-tutorial',
    NativeScriptOrg + '/nativescript-template-tutorial',
    NativeScriptOrg + '/template-blank-ng',
    NativeScriptOrg + '/template-blank-ts',
    NativeScriptOrg + '/template-blank',
    NativeScriptOrg + '/template-master-detail-kinvey-ng',
    NativeScriptOrg + '/template-master-detail-kinvey-ts',
    NativeScriptOrg + '/template-master-detail-kinvey',
    NativeScriptOrg + '/template-patient-care-ng',
    NativeScriptOrg + '/template-health-survey-ng',
    NativeScriptOrg + '/nativescript-page-templates-ng',
    NativeScriptOrg + '/nativescript-page-templates-ts',
    NativeScriptOrg + '/nativescript-page-templates',
    NativeScriptOrg + '/nativescript-starter-kits',
    NativeScriptOrg + '/starter-kit-tests',
    NativeScriptOrg + '/nativescript-starter-kits-utils',
    // Main repos
    NativeScriptOrg + '/NativeScript',
    NativeScriptOrg + '/nativescript-angular',
    NativeScriptOrg + '/nativescript-cli',
    NativeScriptOrg + '/docs',
    NativeScriptOrg + '/android-runtime',
    NativeScriptOrg + '/ios-runtime',
    NativeScriptOrg + '/tns-core-modules-widgets',
    NativeScriptOrg + '/nativescript-vscode-extension',
    NativeScriptOrg + '/nativescript-dev-webpack',
    NativeScriptOrg + '/nativescript-dev-appium',
    NativeScriptOrg + '/nativescript-dev-typescript',
    NativeScriptOrg + '/nativescript-angular',
    // Sampels
    NativeScriptOrg + '/sample-Groceries',
    NativeScriptOrg + '/nativescript-marketplace-demo',
    NativeScriptOrg + '/nativescript-sdk-examples-ng',
    NativeScriptOrg + '/ns-ng-animation-examples',
    NativeScriptOrg + '/nativescript-marketplace-demo',
    NativeScriptOrg + '/nativescript-marketplace-demo',
    // Playground
    NativeScriptOrg + '/playground-feedback',
    NativeScriptOrg + '/playground-tests',
]