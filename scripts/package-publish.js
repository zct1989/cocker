#!/usr/bin/env node
var shell = require('shelljs');
var utils = require('./utils')

utils.exist(['git', 'tsc'])

shell.cd('./packages/core');

shell.exec('tsc')
shell.cp('./package.json', '../../dist/packages/core/')
shell.cd('../../dist/packages/core')
shell.exec('npm publish --access=public')




