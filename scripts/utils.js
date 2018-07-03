var shell = require('shelljs');

module.exports = {
  exist(commands) {
    commands.forEach(command => {
      if (!shell.which(command)) {
        shell.echo('Sorry, this script requires ' + command);
        shell.exit(1);
      }
    });
  }
}