/** Load todo related model **/
const TodoModel = require('../models/todos.models');

/** Load user related model **/
const UserModel = require('../models/users.models');

/** Load path core module **/
const path = require('node:path');

const { v4: uuidv4 } = require('uuid'); // for random id generation ...

const { unlinkOldImg } = require('../helpers/unlinkOldImg'); // helper function ...

/** Load config module **/
const config = require('../config/config');

// Controller Object -- module scaffolding 
const controller = {};

controller.postTodo = async (req, res) => {
    const { title, desc, status } = req.body;
    const baseUrl = `${config.app.baseUrl}:${config.app.port}`;
    const img_url = req.file ? `${baseUrl}/images/${req.file.filename}` : false;
    if (title && desc && status && img_url) {
        try {
            const todo = new TodoModel({ // here todo is an instance of model class/ document class ...
                id: uuidv4(),
                title,
                desc,
                imgUrl: img_url,
                status,
                user: req.id
            });
            const data = await todo.save();
            await UserModel.updateOne({ _id: req.id }, { $push: { todos: data._id } });
            res.status(201).json({
                success: true,
                message: 'Todo has been added successfully',
                data
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error
            });
        }
    } else {
        res.status(400).json({
            success: false,
            message: 'Invalid Client Request !!!'
        });
    }
};

controller.getAllTodos = async (_, res) => {
    try {
        const data = await TodoModel.find().select({ __v: 0, _id: 0 }).populate("user", "userName email -_id").exec();
        if (data.length) {
            res.status(200).json({
                success: true,
                todos: data
            });
        } else {
            res.status(200).json({
                success: false,
                message: 'Empty Todo List !!!',
                todos: null
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
};


controller.getTodoById = async (req, res) => {
    try {
        const _tId = req.params.id;
        const todo = await TodoModel.findOne({ id: _tId }).select({ __v: 0, _id: 0 }).exec();
        if (todo) {
            res.status(200).json({
                success: true,
                todo
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Todo of given id does not exist !!!',
                todo: null
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
};

controller.getAllActiveTodos = async (_, res) => {
    try {
        const todo = new TodoModel(); // todo is an object of model/ document class ....
        const data = await todo.findActiveTodos();
        res.status(200).json({
            success: true,
            todos: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
};

controller.getTodosByJs = async (_, res) => {
    try {
        const data = await TodoModel.findTodoByJs();
        res.status(200).json({
            success: true,
            todos: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
};

controller.getTodosByKeywords = async (req, res) => {
    try {
        const keywords = req.params.keywords;
        const data = await TodoModel.find().select({
            _id: 0,
            __v: 0
        }).searchByKeywords(keywords).exec();
        res.status(200).json({
            success: true,
            todos: data
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

controller.updateTodoById = async (req, res) => {
    if (req.method === "PUT" || req.method === "PATCH") {
        const _tId = req.params.id;
        try {
            const data = await TodoModel.findOne({ id: _tId });
            if (data) {
                const { title, desc, status } = req.body;
                const baseUrl = `${config.app.baseUrl}:${config.app.port}`;
                const img_url = req.file ? `${baseUrl}/images/${req.file.filename}` : false;
                const fieldsToUpdate = {};
                if (title) fieldsToUpdate.title = title;
                if (desc) fieldsToUpdate.desc = desc;
                if (status) fieldsToUpdate.status = status;
                if (req.file) fieldsToUpdate.imgUrl = img_url;

                if (Object.keys(fieldsToUpdate).length > 0) {
                    const updateTodo = async (fieldsToUpdate) => {
                        try {
                            const results = await TodoModel.updateOne({ id: _tId }, { $set: fieldsToUpdate });
                            if (results?.modifiedCount) {
                                res.status(200).json({
                                    success: true,
                                    message: 'Todo of given id has been updated successfully',
                                });
                            } else {
                                res.status(400).json({
                                    success: false,
                                    message: "Updation failed, something went wrong !!!",
                                });
                            }
                        } catch (error) {
                            res.status(500).json({
                                success: false,
                                error
                            });
                        }
                    };

                    if (fieldsToUpdate.imgUrl) {
                        unlinkOldImg(__dirname + `/../public/assests/images/${path.basename(data.imgUrl)}`, async (err) => {
                            if (err) {
                                res.status(500).json({
                                    success: false,
                                    message: 'Error unlinking old image',
                                    error: err
                                });
                            } else {
                                await updateTodo(fieldsToUpdate);
                            }
                        });
                    } else {
                        await updateTodo(fieldsToUpdate);
                    }

                } else {
                    res.status(400).json({
                        success: false,
                        message: 'Updation failed, please select at least one field !!!'
                    });
                }
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Updation failed, Todo item of given id does not exist !!!'
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                error
            });
        }
    } else {
        res.status(405).json({
            success: false,
            message: `${req.method} method is not allowed !!!`
        });
    }
};


controller.deleteTodoById = async (req, res) => {
    try {
        const _tId = req.params.id;
        const data = await TodoModel.findOne({ id: _tId });
        if (data) {
            unlinkOldImg(__dirname + `/../public/assests/images/${path.basename(data.imgUrl)}`, async (err) => {
                if (err) throw new Error(err);
                else {
                    try {
                        const data = await TodoModel.deleteOne({ id: _tId });
                        if (data?.deletedCount) {
                            res.status(200).json({
                                success: true,
                                message: 'Todo item of given id has been deleted successfully',
                            });
                        } else {
                            res.status(400).json({
                                success: false,
                                message: 'Deletion failed, Something Went Wrong !!!',
                            });
                        }
                    } catch (error) {
                        res.status(500).json({
                            success: false,
                            error
                        });
                    }
                }
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Deletion failed, Todo item of given id does not exist !!!'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error finding todo item in database',
            error
        });
    }
};



module.exports = controller;
console.log('Todo controller is loading');