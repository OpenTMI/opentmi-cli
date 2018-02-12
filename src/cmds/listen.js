const _ = require('lodash');
const {Transport} = require('opentmi-jsclient');
const {createStream} = require('table');


const untilSignal = (signal='SIGINT') => {
  console.log(`listening until ${signal}..`);
  return new Promise((resolve) => {
    process.on(signal, resolve);
  });
};

const colored = (value) => {
  const reset ='\x1B[49m';
  const red = '\x1B[41m';
  const green = '\x1B[42m';
  const yellow = '\x1B[43m';

  const map = {
    pass: green,
    fail: red,
    inconclusive: yellow
  };
  const color = _.get(map, value, yellow);
  return `${color}${value}${reset}`
};


const listenResults = (argv) => {
  const transport = new Transport(argv.host);
  transport.token = argv.token;

  console.log(`Start listening new results`);
  const config = {
      columnDefault: {
          width: 50
      },
      columnCount: 2
  };
  const stream = createStream(config);
  transport
    .connect('/results')
    .then(() => transport.sio('/results'))
    .then((sio) => {
      sio.on('new', (result) => {
        const tc = result.tcid;
        const verdict = colored(_.get(result, 'exec.verdict'));
        stream.write([tc, verdict]);
      });
      return untilSignal();
    })
    .then(() => {
      transport.disconnect();
    });
};


module.exports = {
  listenResults
};
