const {Transport, Authentication} = require('opentmi-jsclient');
const config = require('../config');

const authenticateUser = ({username, password, host}) => {
  console.log('login..', host, username, password);
  const transport = new Transport(host);
  const auth = new Authentication(transport);
  auth.login(username, password)
    .then((token) => {
      config
        .set('host', host)
        .set('token', token)
        .write();
      console.log('Login success');
    })
    .catch((error) => {
      console.error(`Login failed: ${error.message}`);
      config
        .set('host', '')
        .set('token', '')
        .write();
      process.exit(1);
    });
};
const logoutUser = () => {
  config
    .set('host', '')
    .set('token', '')
    .write();
};

module.exports = {authenticateUser, logoutUser};
