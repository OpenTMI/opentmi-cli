const {Transport, Admin} = require('opentmi-jsclient');


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


module.exports = {
  updateVersion
};
