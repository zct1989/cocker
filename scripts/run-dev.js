const shelljs = require('shelljs')

shelljs.exec('gulp build:dev')
shelljs.cd('example')
shelljs.exec('npm run dev')
