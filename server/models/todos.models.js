/** Load mongoose external JS ODM (Object Data Mapping/ Model) or, ORM (Object Relational Mapping) library for abstraction between raw mongodb and express server **/
const mongoose = require('mongoose');

// create a todo schema  object for db which is followed by express server
const todoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: [true, '**title is required']
    },
    desc: {
        type: String,
        required: [true, '**description is required']
    },
    imgUrl: {
        type: String,
        required: [true, '**image is required']
    },
    status: {
        type: String,
        required: [true, '**status is required'],
        enum: ['active', 'inactive']
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
});

/** Instance methods **/
todoSchema.methods = {
    findActiveTodos: function () {
        return mongoose.model('Todo').find({ status: 'active' });
    }
};

/** Static methods **/
todoSchema.statics = {
    findTodoByJs: function () {
        return this.find({ title: /js/i }); // regular expression pattern that matches js with case insensitive way ....
    }
};

/** Query Helpers **/
todoSchema.query = {
    searchByKeywords: function (keywords) {
        return this.find({ title: new RegExp(keywords, "i") });
    }
};

// create a todo model based on todo schema 
const Todo = new mongoose.model('Todo', todoSchema);

// Exporting the todo model ...
module.exports = Todo;
console.log('Todo model is loading ...');