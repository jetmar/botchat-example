const low = require('lowdb');
const fileAsync = require('lowdb/adapters/FileAsync');
let db = {};
async function createConnection() {
    const file = new fileAsync('db.json');
    db = await low(file)
    db.defaults({users:[], transfer:[]}).write();
}
const getConnection = ()=> db;
module.exports = {
    createConnection,
    getConnection
}