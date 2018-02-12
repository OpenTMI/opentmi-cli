const {Transport, Admin} = require('opentmi-jsclient');

const showVersion = (argv) => {
  const transport = new Transport(argv.host);
  transport.token = argv.token;
  const admin = new Admin(transport);
  admin.version()
    .then(ver => console.log(ver))
    .catch((error) => {
      console.error(`failed: ${error.message}`);
    });
};

const updateVersion = (argv) => {
  const version = argv.revision;
  const transport = new Transport(argv.host);
  transport.token = argv.token;
  const admin = new Admin(transport);
  console.log(`Start updating to ${version}`);
  transport
    .connect()
    .then(() => transport.sio())
    .then((sio) => {
      sio.on('status', (status) => {
        console.log(status);
      });
      return admin.upgrade(version)
        .then(ver => console.log(`Backend updated to ${JSON.stringify(ver)}`))
        .catch((error) => {
          console.error(`failed: ${error.message}`);
        });
    })
    .then(() => {
      transport.disconnect();
    });
};

const reloadWorkers = (argv) => {
  const transport = new Transport(argv.host);
  transport.token = argv.token;
  const admin = new Admin(transport);
  console.log('Start reloading workers..');
  admin.reloadWorkers()
    .then(() => { console.log(`Reload success`); })
    .catch((error) => {
      console.error(`failed: ${error.message}`);
    });
};

module.exports = {
  showVersion,
  updateVersion,
  reloadWorkers
};
