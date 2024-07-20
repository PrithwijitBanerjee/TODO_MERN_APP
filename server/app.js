/** Load express third-party lib/ backend framework **/
const express = require('express');

/** Load CORS external middleware **/
const cors = require('cors');

/** Load connection module **/
const { createConnection } = require('./config/db_connect');

/** Load config module **/
const config = require('./config/config');

/** Load todo related routes **/
const todoRoute = require('./routes/todos.routes');

/** Load user related routes **/
const userRoute = require("./routes/users.routes");

/** Create an application level instance of express **/
const app = express();

createConnection(); // establish db connection ...

/** Disable CORS to tell the express server to share it's resources to the specified trustable web clients from different domain with different PORT no... **/
app.use(cors({ origin: 'http://localhost:5173' }));

/** Express built-in body-parser middleware **/
app.use(express.urlencoded({ extended: true })); // for web clients like: Angular, React or, Vue js ...
app.use(express.json());  // for mobile as well as hybrid clients ...

/** use express.static() built-in middleware to tell the express server to share it's all static resources to the web clients  **/
app.use(express.static(__dirname + '/public/assests/'));

/** Basic Landing Page **/
app.get('/', (_, res) => {
    res.status(200).sendFile(__dirname + '/views/');
});

/** Define todo related route in app **/
app.use(`${config.app.apiUrl}/todos`, todoRoute);

/** Define user related route in app **/
app.use(`${config.app.apiUrl}/users`, userRoute);

/** custom middleware to handle route not found error **/
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'Route does not exist !!!'
    });
});

/** custom middleware to handle server error **/
app.use((err, req, res, next) => {
    if (!res.headersSent) {
        next(err);
    } else {
        res.status(500).json({
            success: false,
            error: err
        });
    }
});

module.exports = app;