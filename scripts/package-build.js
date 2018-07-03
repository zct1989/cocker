#!/usr/bin/env node
require('shelljs/global');

if (!which('git')) {
  echo('Sorry, this script requires git');
  exit(1);
}

if (!which('tsc')) {
  echo('Sorry, this script requires typescript');
  exit(1);
}

cd('./packages/core');
tsc()




