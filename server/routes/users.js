const dotenv = require('dotenv');
const usersDataBase = require('../../database/usersHandlerDB');
dotenv.config();

const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const allUsers = await usersDataBase.getAllUsers();
        res.status(200).send('success give all users');
        res.send(allUsers);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await usersDataBase.getUserById(userId);
        res.send(user);
    } catch (error) {
        console.error(`Error retrieving user with ID ${userId}:`, error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/register', async (req, res) => {
    const newUser = req.body;
    try {
        const resultRegister = await usersDataBase.addUser(newUser);
        if (resultRegister.insertId > 0) {
            res.status(201).send(`User added with ID: ${userId}`);
        } else {
            res.status(404).send('User already registered');
        }
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // בדיקה אם המשתמש קיים והסיסמה נכונה
    const query = `
      SELECT *
      FROM users
      NATURAL JOIN passwords ON users.username = passwords.username
      WHERE users.username = ? AND passwords.website = ?;
    `;
    con.query(query, [username, password], (error, results, fields) => {
        if (error) {
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log(results.length);
        // אם יש תוצאות מהשאילתה, משתמש מחובר
        if (results.length > 0) {

            res.status(200).send('המשתמש מחובר בהצלחה');
        } else {
            res.status(401).send('שם משתמש או סיסמה לא תקינים');
        }
    });
});


router.put('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    try {
        const result = await usersDataBase.updateUser(userId, updatedUserData);
        if (result.affectedRows > 0) {
            res.status(200).send(`User with ID ${userId} updated successfully`);
        } else {
            res.status(404).send(`User with ID ${userId} not found`);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const result = await usersDataBase.deleteUser(userId);
        if (result.affectedRows > 0) {
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