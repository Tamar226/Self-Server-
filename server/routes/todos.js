const todosDataBase=require('../../database/todosHandlerDB');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const result = await todosDataBase.getAllTodos();
        if (result.hasError){
            res.status(404).send('Error');
        }
        res.send(allTodos);
    } catch (error) {
        console.error('Error retrieving todos:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    try {
        const result = await todosDataBase.getTodoById(todoId);
        if (result.hasError){
            res.status(404).send('Error');
        }
        res.send(allTodos);
        res.send(todo);
    } catch (error) {
        console.error(`Error retrieving todo with ID ${todoId}:`, error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const newTodo = req.body;
    try {
        const result = await todosDataBase.addTodo(newTodo);
        res.status(201).send(`Todo added with ID: ${todoId}`);
    } catch (error) {
        console.error('Error adding todo:', error);
        res.status(500).send('Internal Server Error');
    }
});

  router.put('/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    const updatedTodoData = req.body;
    try {
      const rowsAffected = await todosDataBase.updateTodo(todoId, updatedTodoData);
      if (rowsAffected > 0) {
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
        const rowsAffected = await todosDataBase.deleteTodo(todoId);
        if (rowsAffected > 0) {
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
