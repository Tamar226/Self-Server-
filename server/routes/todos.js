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
async function getTodoById(userId) {
    try {
        const [user] = await con.promise().query('SELECT * FROM todos WHERE id = ?', [userId]);
        if (user.length === 0) {
            throw new Error(`User with ID ${userId} not found`);
        }
        return user[0];
    } catch (error) {
        throw error;
    }
}
router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await getTodoById(userId);
        res.send(user);
    } catch (error) {
        console.error(`Error retrieving user with ID ${userId}:`, error);
        res.status(500).send('Internal Server Error');
    }
});
async function addTodo(newTodo) {
    try {
        const result = await con.promise().query('INSERT INTO todos SET ?', newTodo);
        return result.insertId;
    } catch (error) {
        throw error;
    }
}
router.post('/', async (req, res) => {
    const newTodo = req.body;
    try {
        const userId = await addTodo(newTodo);
        res.status(201).send(`Todo added with ID: ${userId}`);
    } catch (error) {
        console.error('Error adding todo:', error);
        res.status(500).send('Internal Server Error');
    }
});
async function deleteTodo(userId) {
    try {
        const result = await con.promise().query('DELETE FROM todos WHERE id = ?', userId);
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
}
router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const rowsAffected = await deleteTodo(userId);
        if (rowsAffected > 0) {
            res.status(200).send(`User with ID ${userId} deleted successfully`);
        } else {
            res.status(404).send(`User with ID ${userId} not found`);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
