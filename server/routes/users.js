const dotenv = require('dotenv');
const usersDataBase = require('../../database/usersHandlerDB');
const todosDataBase = require('../../database/todosHandlerDB');
const postsDataBase = require('../../database/postsHandlerDB');
const commentsDataBase = require('../../database/commentsHandlerDB');
dotenv.config();

const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const result = await usersDataBase.getAllUsers();
        if (result.hasError) {
            res.status(404).send('Error');
        }
        else {
            res.status(200).send(['success get all users', result]);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});


router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const result = await usersDataBase.getUserById(userId);
        if (result.hasError) {
            res.status(404).send('Error');
        }
        else {
            res.status(200).send([`success get user by id: ${userId}`, result]);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:userId/:typeInformetion', async (req, res) => {
    const userId = req.params.userId;
    const type = req.params.typeInformetion;
    try {
        var result;
        switch (type) {
            case 'posts':
                result = await postsDataBase.getPostById(userId);
                break;
            case 'todos':
                result = await todosDataBase.getTodoById(userId);
                break;
            case 'comments':
                result = await commentsDataBase.getCommentById(userId);
                break;
            default:
                break;
        }
        if (result.hasError) {
            res.status(404).send('Error');
            return;
        }
        else {
            res.status(200).send(result.data);
            return;
        }
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
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

router.post('/register', async (req, res) => {
    debugger;
    const newUser = req.body;
    try {
        const find = await usersDataBase.getUserByUsername(newUser.username);
        if (find.affectedRows != 0) {
        }
        const resultRegister = await usersDataBase.addUser(newUser);
        if (resultRegister.insertId > 0) {
            res.status(201).send(`User added with ID: ${userId}`);
        } else {
            res.status(404).send('User already registered');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.post('/login', async (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;
    try {
        const result = await usersDataBase.getUserDetails(userName, password);
        if (result.hasError) {
            res.status(404).send('Error');
        }
        else {
            res.status(200).send(JSON.stringify(result));
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});



module.exports = router;