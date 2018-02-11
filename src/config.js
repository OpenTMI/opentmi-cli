// native modules

// 3rd party modules
const findUp = require('find-up');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const DEFAULT_FILE = '.opentmi';
const configPath = findUp.sync([DEFAULT_FILE, '.opentmi.json']);
const adapter = new FileSync(configPath || DEFAULT_FILE);
const db = low(adapter);

db.defaults({host: '', token: ''}).write();

module.exports = db;
