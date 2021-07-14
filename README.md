[![Codacy Badge](https://app.codacy.com/project/badge/Grade/f34f559cc4ef4afe84448d15fb674f30)](https://www.codacy.com/gh/systelab/systelab-charts/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=systelab/systelab-charts&amp;utm_campaign=Badge_Grade)
[![Build Status](https://travis-ci.com/systelab/systelab-charts.svg?branch=master)](https://travis-ci.com/systelab/systelab-charts)
[![npm version](https://badge.fury.io/js/systelab-charts.svg)](https://badge.fury.io/js/systelab-charts)
[![Known Vulnerabilities](https://snyk.io/test/github/systelab/systelab-charts/badge.svg?targetFile=package.json)](https://snyk.io/test/github/systelab/systelab-charts?targetFile=package.json)

# systelab-charts

Library with charts components to speed up your Angular developments.

## Working with the repo

In order to clone the repository and test the library use the following commands:

```bash
git clone https://github.com/systelab/systelab-charts.git
cd systelab-charts
npm run build-lib
ng serve
```

This will bootstrap a showcase application to test the different charts.

In order to publish the library, an authorized npm user is required. Once set, update the version in the package.json, and run the npm publish script:

```npm
npm run build-lib
cd dist/systelab-charts
npm publish
```

## Documentation

Read the [provided documentation](https://github.com/systelab/systelab-charts/blob/master/projects/systelab-charts/README.md) to use the library

# Breaking changes

## Version 6
Few changes where introduce in version 6 in order to standardize the library and support Angular 9.
The following steps should be consider when migrating from version 5.

1. When importing the module do not use .forRoot(); In WebStorm, replace in path:
```
- SystelabChartsModule.forRoot\(\)
- SystelabChartsModule
```
2. When importing services and modules import them from systelab-charts root. In WebStorm, replace in path:
```
- from 'systelab-charts/lib.+
- from 'systelab-charts';
```

## Version 9 - Angular 12

Added chartjs dependencies from peerDependencies to dependencies, now no need to add it in app package that uses the library.

IE11 support has been deprecated due to the upgrade to Angular 12

Use of [Ivy](https://angular.io/guide/ivy), applications that uses this library have to use Angular 12 and Ivy rendering.

Added --noImplicitOverride flag to allow override methods and get error for unintentionally overrides https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html#override-and-the---noimplicitoverride-flag