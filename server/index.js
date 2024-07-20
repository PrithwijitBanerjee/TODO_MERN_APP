/** Load application level server **/
const app = require('./app');

/** Load config module **/
const config = require('./config/config');

const PORT = config.app.port || 3000;

/** Bind the server with the PORT No. **/
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});