const todosDataBase = require('../../database/todosHandlerDB');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await todosDataBase.getAllTodos();
        if (result.hasError) {
            res.status(404).send('Error');
        }
        else {
            res.status(200).send(['success get all todos', result]);
        }
    } catch (error) {
        console.error('Error retrieving todos:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    try {
        const result = await todosDataBase.getTodoById(todoId);
        if (result.hasError) {
            res.status(404).send('Error');
        }
        else {
            res.status(200).send([`Success brought todo with ID ${todoId}`, result]);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const newTodo = req.body;
    try {
        const result = await todosDataBase.addTodo(newTodo);
        if (result.insertId > 0) {
            const insertTodo = await todosDataBase.getTodoById(result.insertId);
            res.status(200).send(insertTodo.data);
        } else {
            res.status(404).send('Error adding todo');
        }
    } catch (error) {
        console.error('Error adding todo:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.put('/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    const updatedTodoData = req.body;
    try {
        const result = await todosDataBase.updateTodo(todoId, updatedTodoData);
        if (result.affectedRows > 0) {
            res.status(200).send(`Todo with ID ${todoId} updated successfully`);
        } else {
            res.status(404).send(`Todo with ID ${todoId} not found`);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


router.delete('/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    try {
        const result = await todosDataBase.deleteTodo(todoId);
        if (result.affectedRows > 0) {
            res.status(200).send(`Todo with ID ${todoId} deleted successfully`);
        } else {
            res.status(404).send(`Todo with ID ${todoId} not found`);
        }
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
