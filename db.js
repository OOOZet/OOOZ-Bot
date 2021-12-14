const JSONdb = require('simple-json-db');
const db = new JSONdb('./db.json');

module.exports = db;
