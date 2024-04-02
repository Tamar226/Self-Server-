const dotenv = require('dotenv');
const usersDataBase = require('../../database/usersHandlerDB');
dotenv.config('');

const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const allUsers = await usersDataBase.getAllUsers();
        if (result.hasError){
            res.status(404).send('Error');
        }
        res.send(allUsers);
    } catch (error) {
        console.error('Error retrieving users:', error);
    }
});


router.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await usersDataBase.getUserById(userId);
        if (result.hasError){
            res.status(404).send('Error');
        }
        res.send(user);
    } catch (error) {
        console.error(`Error retrieving user with ID ${userId}:`, error);
    }
});

router.post('/', async (req, res) => {
    const newUser = req.body;
    try {
        const userId = await usersDataBase.addUser(newUser);
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
// router.delete('/:userId', async (req, res) => {
//     const userId = req.params.userId;
//     try {
//         const result = await con.promise().query('DELETE FROM users WHERE id = ?', userId);
//         if (result.affectedRows > 0) {
//             res.status(200).send(`User with ID ${userId} deleted successfully`);
//         } 
//         else{
//             res.status(404).send(`User with ID ${userId} not found`);
//         }
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

module.exports = router;