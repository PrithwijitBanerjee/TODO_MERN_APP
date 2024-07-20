/** Load mongoose external JS ODM (Object Data Mapping/ Model) or, ORM (Object Relational Mapping) library for abstraction between raw mongodb and express server **/
const mongoose = require('mongoose');

/** Load mongoose-unique-validator external plugin from npm for showing custom message for unique constraints **/
const uniqueValidator = require('mongoose-unique-validator');

/** Create user schema for user collection by user model **/
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "**user name is required"]
    },
    email: {
        type: String,
        required: [true, "**email id is required"],
        // match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        unique: true
    },
    phoneNo: {
        type: String,
        // validate: {
        //     validator: function (v) {
        // This regex validates Indian phone numbers starting with +91 and a valid 10-digit number starting with 6-9
        //         return /^\+91[6-9]\d{9}$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid phone number!`
        // },
        required: [true, "**phone no is required"],
        unique: true
    },
    password: {
        type: String,
        // validate: {
        //     validator: function (v) {
        // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
        //         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
        //     },
        //     message: props => `Invalid Password !!!`
        // },
        required: [true, "**password is required"]
    },
    role: {
        type: String,
        enum: ['admin', 'regular'],
        default: 'regular'
    },
    todos: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Todo'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

/** Apply the uniqueValidator plugin to userSchema. **/
userSchema.plugin(uniqueValidator, { message: '{PATH} already exists' });

/** Static methods **/
userSchema.statics = {
    findUsr: function (email) {
        return this.findOne({ email: email });
    }
}

// create a user model based on todo schema
const User = new mongoose.model('User', userSchema);

module.exports = User;
console.log("user model is loading ...");