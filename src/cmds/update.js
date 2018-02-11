const {Transport, Admin} = require('opentmi-jsclient');
const {table} = require('table');

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
  admin.upgrade(version)
    .then(ver => console.log(`Backend updated to ${ver}`))
    .catch((error) => {
      console.error(`failed: ${error.message}`);
    });
};

module.exports = {
  showVersion,
  updateVersion
};
