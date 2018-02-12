const {Transport, Admin} = require('opentmi-jsclient');

const reloadWorkers = (argv) => {
  const transport = new Transport(argv.host);
  transport.token = argv.token;
  const admin = new Admin(transport);
  console.log('Start reloading workers..');
  return admin.reloadWorkers()
    .then(() => { console.log(`Reload success`); })
    .catch((error) => {
      console.error(`failed: ${error.message}`);
    });
};

module.exports = {
  reloadWorkers
};
