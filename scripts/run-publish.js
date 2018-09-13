const shelljs = require('shelljs')
const path = require('path')
let root = path.resolve(__dirname, '..')
shelljs.exec("npm run build")
shelljs.cp(".publishrc", "./bundle/common/")
shelljs.cp(".publishrc", "./bundle/core/")
shelljs.cp(".publishrc", "./bundle/extend/")

shelljs.cd(path.join(root, 'bundle', 'common'))
let child = shelljs.exec("npx publish-please")

shelljs.cd(path.join(root, 'bundle', 'core'))
shelljs.exec("npm run publish-please")

shelljs.cd(path.join(root, 'bundle', 'extend'))
shelljs.exec("npm run publish-please")