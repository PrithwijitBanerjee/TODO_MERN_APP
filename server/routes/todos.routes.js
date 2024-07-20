/** Load express third-party lib/ backend framework **/
const express = require('express');

/** Load todo related controllers **/
const todoController = require('../controllers/todos.controllers');

/** Load custom file upload middleware **/
const handleFileUpload = require('../middlewares/fileUpload.middlewares');

/** Load verifyUsrAuthToken custom middlewares for authentication **/
const { verifyUsrAuthToken } = require('../middlewares/verifyUsrAuthToken.middleware');

/** Create a routing service for todo **/
const todoRoute = express.Router({
    caseSensitive: true
});

// Handles all todo related routes/ API Endpoints

// get all todos list :GET (Public API)
todoRoute.get("/list", todoController.getAllTodos)

    // get particular todo by :id  :GET (Public API)
    .get("/list/:id", todoController.getTodoById)

    // search todo by title :keywords :GET (Public API)
    .get("/search/:keywords", todoController.getTodosByKeywords)

    // get all active todos :GET (Private API)
    .get('/list/active/all', verifyUsrAuthToken, todoController.getAllActiveTodos)

    // get all todos by JS :GET (Public API)
    .get('/list/search/js', todoController.getTodosByJs)

    // add single todo :POST (Private API)
    .post("/add", verifyUsrAuthToken, handleFileUpload, todoController.postTodo)

    // delete todo item by :id :DELETE (Private API)
    .delete("/del/:id", verifyUsrAuthToken, todoController.deleteTodoById)

    // update single todo by :id :PUT (single update) or, :PATCH (single as well as bulk update) (Private API)
    .all("/edit/:id", verifyUsrAuthToken, handleFileUpload, todoController.updateTodoById);

module.exports = todoRoute;
console.log('todo route is loading ...');