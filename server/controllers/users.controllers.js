/** Load users related model **/
const UserModel = require('../models/users.models');

/** Load fs core module of node js **/
const fs = require('node:fs');

/** Load generate hash password utility functions **/
const generateHashPass = require('../helpers/generateHashPass');

/** Load verify user hash password utility function **/
const verifyHashPass = require('../helpers/verifyUsrHashPass');

/** Load jsontocsv external module to convert json data into csv format **/
const json2csv = require('json2csv');

/** Load jsonwebtoken external module **/
const jwt = require('jsonwebtoken');

/** Load custom validation module for email, phone, and password validation **/
const { validateEmail, validatePassword, validatePhoneNumber } = require('../helpers/customValidation');

// Controller object -- module scaffolding
const controller = {};


// handles user sign Up ...
controller.handleSignUpUsr = async (req, res) => {
    try {
        if (!validateEmail(req.body.email)) {
            return res.status(400).json({
                success: false,
                message: 'Sign Up failed, Invalid Email Id !!!'
            });
        }
        if (!validatePhoneNumber(req.body.phoneNo)) {
            return res.status(400).json({
                success: false,
                message: 'Sign Up failed, Invalid Phone No. !!!'
            });
        }
        if (!validatePassword(req.body.password)) {
            return res.status(400).json({
                success: false,
                message: 'Sign Up failed, Invalid Password !!!'
            });
        }
        const hashPassword = await generateHashPass(req.body.password);
        let usrDocument = null;
        if (req.body.role) {
            usrDocument = new UserModel({
                userName: req.body.userName,
                email: req.body.email,
                phoneNo: req.body.phoneNo,
                password: hashPassword,
                role: req.body.role,
            });
        } else {
            usrDocument = new UserModel({
                userName: req.body.userName,
                email: req.body.email,
                phoneNo: req.body.phoneNo,
                password: hashPassword,
            });
        }
        const data = await usrDocument.save();
        if (data) {
            res.status(201).json({
                success: true,
                message: `${data?.userName} has Signed Up Successfully`
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'User sign up failed !!!',
            });
        }
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Extract the error message from Mongoose validation error
            const errorMessages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                // message: 'User sign up failed !!!',
                message: errorMessages[0]
            });
        }
        res.status(400).json({
            success: false,
            // message: 'User sign up failed !!!',
            message: error && error?.errorResponse && error?.errorResponse?.errmsg
        });
    }
};

// Sign In User

controller.handleSignInUsr = async (req, res) => {
    try {
        const data = await UserModel.findUsr(req.body.email);
        if (data && data?.email) {
            const isValidPass = await verifyHashPass(req.body.password, data?.password);
            if (isValidPass) {
                const access_token = jwt.sign({
                    email: data?.email,
                    role: data?.role,
                    userId: data?._id
                }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
                res.status(200).json({
                    success: true,
                    name: data?.userName,
                    message: 'User successfully login',
                    access_token
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Authentication failed, invalid password !!!'
                });
            }
        } else {
            res.status(401).json({
                success: false,
                message: 'Authentication failed, email does exist, try with different ...'
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};


controller.forgotPass = async (req, res) => {
    try {
        const data = await UserModel.findUsr(req.body.email);
        if (data) {
            const hashPassword = await generateHashPass(req.body.password);
            const myRes = await UserModel.updateOne({ email: req.body.email }, { $set: { password: hashPassword } });
            if (myRes) {
                res.status(200).json({
                    success: true,
                    message: 'Your password has been changed successfully'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Password does not changed, Invalid request !!!'
                });
            }
        } else {
            res.status(404).json({
                success: false,
                message: 'This email does not exist !!!'
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

controller.getAllUsers = async (_, res) => {
    try {
        const users = await UserModel.find().select({ __v: 0, password: 0 }).populate("todos", "-_id -__v").exec();
        if (users.length) {
            res.status(200).json({
                success: true,
                users
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'No Users Present !!!',
                users: null
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

controller.handleDelUsr = async (req, res) => {
    try {
        const data = await UserModel.deleteOne({ _id: req.params.id });
        if (data?.deletedCount) {
            res.status(200).json({
                success: true,
                message: 'User of given id has been deleted successfully'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Deletion Failed, user of given id does not exist !!!'
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

controller.exportJsonToCsv = async (_, res) => {
    try {
        const users = await UserModel.find().select({ __v: 0, password: 0 }).exec();
        if (users.length) {
            const fields = [
                {
                    label: 'User Name',
                    value: 'userName'
                },
                {
                    label: 'Email',
                    value: 'email'
                },
                {
                    label: 'Phone Number',
                    value: 'phoneNo'
                },
                {
                    label: 'Role',
                    value: 'role'
                }
            ];
            const parser = new json2csv.Parser({ fields });
            const csvData = parser.parse(users);
            await fs.promises.writeFile(__dirname + '/../csv_data/users.csv', csvData);
            res.attachment('/../csv_data/users.csv'); // to tell express server the csv file should be downloadable in client's machine ....
            res.status(200).send(csvData);
        } else {
            res.status(404).json({
                success: false,
                message: 'Cannot export empty users list !!!'
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

// Exporting the module 
module.exports = controller;
console.log("user controller is loading ...");