/** Load dotenv external package/ middleware and configure it globally **/
require('dotenv').config();

const dev = {
    app: {
        port: process.env.NODE_ENV === "developement" ? process.env.PORT : 3000,
        baseUrl: process.env.BASE_URL,
        apiUrl: process.env.API_URL
    },
    db: {
        dbUrl: process.env.DB_URL,
        dbName: process.env.DB_NAME,
        dbPort: process.env.DB_PORT
    }
};


module.exports = dev;