// native modules

// 3rd party modules
const yargs = require('yargs');

// app modules
const {authenticateUser, logoutUser} = require('./cmds/login');
const {showVersion} = require('./cmds/show');
const {updateVersion} = require('./cmds/update');
const {reloadWorkers} = require('./cmds/reload');
const {listenResults} = require('./cmds/listen');
const config = require('./config');


yargs.usage('Usage: $0 <command> [options]')
  .command('login <host> [username] [password]', 'Authenticate user', () => {}, authenticateUser)
  .command('logout', 'Logout user', () => {}, logoutUser)
  .command('show', 'Show something from server', argv =>
    argv
      .command('version', 'Show server version', () => {}, showVersion))
  .command('update', 'Update something from server', argv =>
    argv
      .command('version <revision>', 'Update server version', () => {}, updateVersion))
  .command('reload', 'Reload something from server', argv =>
    argv
      .command('workers', 'Reload workers', () => {}, reloadWorkers))
  .command('listen', 'Listen events', argv =>
    argv
      .command('results', 'Listen new results', () => {}, listenResults))
  .config(config.getState())
  .demandCommand()
  .alias('h', 'help')
  .epilog('copyright 2018');


module.exports = {
  yargs,
  args: yargs.argv
};
