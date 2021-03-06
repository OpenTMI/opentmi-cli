// native modules

// 3rd party modules
const yargs = require('yargs');

// app modules
const {authenticateUser, logoutUser} = require('./cmds/login');
const {showVersion, updateVersion} = require('./cmds/version');
const {showWorkers, reloadWorkers} = require('./cmds/cluster');
const config = require('./config');


yargs.usage('Usage: $0 <command> [options]')
  .command('login <host> [username] [password]', 'Authenticate user', () => {}, authenticateUser)
  .command('logout', 'Logout user', () => {}, logoutUser)
  .command('show', 'Show something from server', argv =>
    argv
      .command('version', 'Show server version', () => {}, showVersion)
      .command('workers', 'Show workers status', () => {}, showWorkers))
  .command('update', 'Update something from server', argv =>
    argv
      .command('version <revision>', 'Update server version', () => {}, updateVersion))
  .command('restart', 'Restart something from server', argv =>
    argv
      .command('workers', 'Restart workers', () => {}, reloadWorkers))
  .config(config.getState())
  .demandCommand()
  .alias('h', 'help')
  .epilog('copyright 2018');


module.exports = {
  yargs,
  args: yargs.argv
};
