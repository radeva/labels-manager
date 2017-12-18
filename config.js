"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.org = 'NativeScript';
exports.token = '<token-here>';
exports.labelRules = [
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
        to: { name: 'severity: high', color: 'ff0000', required: true }
    },
    {
        from: ['s:medium', 's: medium', 'severity: medium'],
        to: { name: 'severity: medium', color: 'ff9933', required: true }
    },
    {
        from: ['s:low', 's: low', 'minor', 'severity: low'],
        to: { name: 'severity: low', color: 'ffff66', required: true }
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
        from: ['backlog'],
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
    }
];
//# sourceMappingURL=config.js.map