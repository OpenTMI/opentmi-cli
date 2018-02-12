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

module.exports = {
  showVersion
};
