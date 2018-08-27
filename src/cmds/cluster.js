const {Transport, Admin, Cluster} = require('opentmi-jsclient');


const showWorkers = (argv) => {
  const transport = new Transport(argv.host);
  transport.token = argv.token;
  const cluster = new Cluster(transport);
  console.log('Start reloading..');
  cluster.refresh()
    .then(() => {
      const {master} = cluster.status;
      const {
        requireRestart, pid, coresUsed, uptime, memoryUsage
      } = master;
      console.log(`PID: ${pid}, coreUsed: ${coresUsed}`);
      console.log(`uptime: ${uptime}`);
      console.log(memoryUsage);
      console.log(`state: ${requireRestart ? 'require restart workers' : 'OK'}`);
      const connected = cluster.workers.filter(w => w.isConnected);
      console.log(`Workers ${connected.length} / ${cluster.workers.length} connected`);
    })
    .catch((error) => {
      console.error(`failed: ${error.message}`);
    });
};

const reloadWorkers = (argv) => {
  const transport = new Transport(argv.host);
  transport.token = argv.token;
  const admin = new Admin(transport);
  console.log('Start reloading..');
  admin.reloadWorkers()
    .then(() => {
      console.log('Workers reloaded');
    })
    .catch((error) => {
      console.error(`failed: ${error.message}`);
    });
};

module.exports = {
  showWorkers,
  reloadWorkers
};
