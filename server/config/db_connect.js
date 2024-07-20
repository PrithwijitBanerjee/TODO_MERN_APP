/** Load mongoose external JS ODM (Object Data Mapping/ Model) or, ORM (Object Relational Mapping) library for abstraction between raw mongodb and express server **/
const mongoose = require('mongoose');

/** Load config module **/
const config = require('../config/config');

// Conn Object -- module scaffolding
const conn = {};

// create a connection between express server and mongodb through mongoose 
conn.createConnection = async () => {
    try {
        await mongoose.connect(config.db.dbUrl);
        console.log("db is connected successfully...");
    } catch (error) {
        throw new Error(error);
        // console.log(error);
        // process.exit(1); // stop the server process forcefully 
    }
}
module.exports = conn;
console.log("conn module is loading ...");
