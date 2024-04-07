const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const router = express.Router();
var con = mysql.createConnection({
    // host: process.env.MYSQL_HOST,
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD,
    // database: process.env.MYSQL_DATABASE,
    // port: process.env.PORT
    host: "localhost",
    user: "root",
    password: "T50226",
    database: "mydb"
});

async function addUser(newUser) {
    try {
        const result = await con.promise().query(`INSERT INTO users (name, username, email,street,city,zipcode, phone, companyName) VALUES ('${newUser.name}', '${newUser.username}', '${newUser.email}', '${newUser.street}','${newUser.city}', '${newUser.zipcode}', '${newUser.phone}','${newUser.companyName}')`);
        await con.promise().query(`INSERT INTO passwords (username, website) VALUES ('${newUser.username}','${newUser.website}')`);
        return result.insertId;
    } catch (error) {
        throw error;
    }
}

router.post('/', async (req, res) => {
    
    const newUser = req.body;
    try {
        const userId = await addUser(newUser);
        res.status(201).send(`User added with ID: ${userId}`);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;