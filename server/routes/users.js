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

async function getAllUsers() {
    const [allUsers] = await con.promise().query('SELECT * FROM users');
    console.log(allUsers);
    return allUsers;
}
router.get('/', async (req, res) => {
    try {
        const allUsers = await getAllUsers();
        res.send(allUsers);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).send('Internal Server Error');
    }
});

async function getUserById(userId) {
    try {
        const [user] = await con.promise().query('SELECT * FROM users WHERE id = ?', [userId]);
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
        const user = await getUserById(userId);
        res.send(user);
    } catch (error) {
        console.error(`Error retrieving user with ID ${userId}:`, error);
        res.status(500).send('Internal Server Error');
    }
});
async function addUser(newUser) {
    try {
        const result = await con.promise().query(`INSERT INTO users (name, username, email,street,city,zipcode, phone, companyName) VALUES ('${newUser.name}', '${newUser.username}', '${newUser.email}', '${newUser.street}','${newUser.city}', '${newUser.zipcode}', '${newUser.phone}','${newUser.companyName}')`);
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
// async function updateUser(userId, updatedUserData) {
//     try {
      
//       const result = await con.promise().query('UPDATE users SET ? WHERE id = ?', [updatedUserData, userId]);
//       return result.affectedRows;
//     } catch (error) {
//         throw error;
//     }
//   }
  
//   router.put('/:userId', async (req, res) => {
//     const userId = req.params.userId;
//     const updatedUserData = req.body;
//     try {
//       const rowsAffected = await updateUser(userId, updatedUserData);
//       if (rowsAffected > 0) {
//         res.status(200).send(`User with ID ${userId} updated successfully`);
//       } else {
//         res.status(404).send(`User with ID ${userId} not found`);
//       }
//     } catch (error) {
//       res.status(500).send('Internal Server Error');
//     }
//   });
  
// async function deleteUser(userId,res) {
//     try {
//         const result = await con.promise().query('DELETE FROM users WHERE id = ?', userId);
//         return result;
//     } catch{
//          res.status(404).send(`User with ID ${userId} not found`);;
//     }
// }
router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const result = await con.promise().query('DELETE FROM users WHERE id = ?', userId);
        if (result.affectedRows > 0) {
            res.status(200).send(`User with ID ${userId} deleted successfully`);
        } 
        else{
            res.status(404).send(`User with ID ${userId} not found`);
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;