/** Load express third-party lib/ backend framework **/
const express = require('express');

/** Load user related controllers **/
const userController = require("../controllers/users.controllers");

/** Load verifyUsrAuthToken custom middlewares for authentication **/
const { verifyUsrAuthToken } = require('../middlewares/verifyUsrAuthToken.middleware');
const { verifyUsrAuthRole } = require('../middlewares/verifyUsrAuthRole.middleware');

/** Create a router service for user related routes **/
const userRoute = express.Router({
    caseSensitive: true,
});


/** Handles all routes/ API Endpoints **/

// SignUp new user :POST (Public Route)
userRoute.post("/signUp", userController.handleSignUpUsr)

    // SignIn user :POST (Public Route)
    .post('/signIn', userController.handleSignInUsr)

    // Forget password :POST (Public Route)
    .post('/forgotPassword', userController.forgotPass)

    // Get list of users :GET (Private Route only Admin can access)
    .get('/list', verifyUsrAuthToken, verifyUsrAuthRole, userController.getAllUsers)

    // export user's json list into csv file (excel file) (Private Route only Admin can access)
    .get('/export_to_csv', userController.exportJsonToCsv)

    // Delete user by :id :Delete (Private Route only Admin can access)
    .delete('/del/:id', verifyUsrAuthToken, verifyUsrAuthRole, userController.handleDelUsr);

module.exports = userRoute;
console.log("user route is loading ...");