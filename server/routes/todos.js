const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = express.Router();
var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    // port: process.env.PORT
});

async function getAllTodos() {
    const [allTodos] = await con.promise().query('SELECT * FROM todos');
    console.log(allTodos);
    return allTodos;
}
router.get('/', async (req, res) => {
    try {
        const allTodos = await getAllTodos();
        res.send(allTodos);
    } catch (error) {
        console.error('Error retrieving todos:', error);
        res.status(500).send('Internal Server Error');
    }
});
async function getTodoById(todoId) {
    try {
        const [todo] = await con.promise().query('SELECT * FROM todos WHERE id = ?', [todoId]);
        if (todo.length === 0) {
            throw new Error(`Todo with ID ${todoId} not found`);
        }
        return todo[0];
    } catch (error) {
        throw error;
    }
}
router.get('/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    try {
        const todo = await getTodoById(todoId);
        res.send(todo);
    } catch (error) {
        console.error(`Error retrieving todo with ID ${todoId}:`, error);
        res.status(500).send('Internal Server Error');
    }
});
async function addTodo(newTodo) {
    try {
        const result = await con.promise().query(`INSERT INTO todos (userID, title,completed) VALUES ('${newTodo.userId}', '${newTodo.title}','${newTodo.completed}')`);
        return result.insertId;
    } catch (error) {
        throw error;
    }
}
router.post('/', async (req, res) => {
    const newTodo = req.body;
    try {
        const todoId = await addTodo(newTodo);
        res.status(201).send(`Todo added with ID: ${todoId}`);
    } catch (error) {
        console.error('Error adding todo:', error);
        res.status(500).send('Internal Server Error');
    }
});
async function updateTodo(todoId, updatedTodoData) {
    try {
      const result = await con.promise().query('UPDATE todos SET ? WHERE id = ?', [updatedTodoData, todoId]);
      return result.affectedRows;
    } catch (error) {
        throw error;
    }
  }
  
  router.put('/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    const updatedTodoData = req.body;
    try {
      const rowsAffected = await updateTodo(todoId, updatedTodoData);
      if (rowsAffected > 0) {
        res.status(200).send(`Todo with ID ${todoId} updated successfully`);
      } else {
        res.status(404).send(`Todo with ID ${todoId} not found`);
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });
  
async function deleteTodo(todoId) {
    try {
        const result = await con.promise().query('DELETE FROM todos WHERE id = ?', todoId);
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
}
router.delete('/:todoId', async (req, res) => {
    const todoId = req.params.todoId;
    try {
        const rowsAffected = await deleteTodo(todoId);
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
