const dotenv = require('dotenv');
const usersDataBase = require('../../database/usersHandlerDB');
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
            res.status(200).send(['success get all users',result]);
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
            res.status(200).send([`success get user by id: ${userId}`,result]);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
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
    const newUser = req.body;
    try {
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


router.post('/login', (req, res) => {
    console.log(req.body);
    const userName=req.body.userName;
    const password=req.body.website;
    try {
        const result =  usersDataBase.getUserDetails(userName, password);
        if (result.hasError) {
            res.status(404).send('Error');
        }
        else {
            res.status(200).send([`success get user details`,result]);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;