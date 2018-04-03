[![Codacy Badge](https://api.codacy.com/project/badge/Grade/e20387044bae4723b400f30df8c973f9)](https://app.codacy.com/app/alfonsserra/systelab-charts?utm_source=github.com&utm_medium=referral&utm_content=systelab/systelab-charts&utm_campaign=badger)
[![Build Status](https://travis-ci.org/systelab/systelab-charts.svg?branch=master)](https://travis-ci.org/systelab/systelab-charts)
[![npm version](https://badge.fury.io/js/systelab-charts.svg)](https://badge.fury.io/js/systelab-charts)

# systelab-charts

Library with charts components to speed up your Angular developments.

## Working with the repo

In order to clone the repository and test the library use the following commands:

```bash
git clone https://github.com/systelab/systelab-charts.git
cd systelab-charts
npm install
ng serve
```

This will bootstrap a showcase application to test the different charts.

In order to publish the library, an authorized npm user is required. Once set, update the version in the package.json, and run the npm publish script:

```npm
npm publish
```

Be careful because temporary folders will be created (build, css, html, widgets,...) and this files should be untracked as it is specified in the gitignore file.
