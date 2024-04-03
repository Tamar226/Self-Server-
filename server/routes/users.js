const dotenv = require('dotenv');
const usersDataBase = require('../../database/usersHandlerDB');
dotenv.config('');

const express = require('express');
const router = express.Router();



async function getAllUsers() {
    const [allUsers] = await con.promise().query('SELECT * FROM users');
    return allUsers;
}

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

<<<<<<< HEAD

=======
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
>>>>>>> dd6f51d050f00cb5889a1cfeaac680f85eaa73ab
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

<<<<<<< HEAD
router.post('/', async (req, res) => {
=======
async function addUser(newUser) {
    try {
        const result = await con.promise().query(`INSERT INTO users (name, username, email,street,city,zipcode, phone, companyName) VALUES ('${newUser.name}', '${newUser.username}', '${newUser.email}', '${newUser.street}','${newUser.city}', '${newUser.zipcode}', '${newUser.phone}','${newUser.companyName}')`);
        await con.promise().query(`INSERT INTO passwords (username, website) VALUES ('${newUser.username}','${newUser.website}')`);
        return result.insertId;
    } catch (error) {
        throw error;
    }
}
router.post('/register', async (req, res) => {
>>>>>>> dd6f51d050f00cb5889a1cfeaac680f85eaa73ab
    const newUser = req.body;
    try {
        const userId = await usersDataBase.addUser(newUser);
        res.status(201).send(`User added with ID: ${userId}`);
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).send('Internal Server Error');
    }
});

<<<<<<< HEAD
// async function updateUser(userId, updatedUserData) {
//     try {
      
//       const result = await con.promise().query('UPDATE users SET ? WHERE id = ?', [updatedUserData, userId]);
//       return result.affectedRows;
//     } catch (error) {
//         throw error;
//     }
//   }
=======

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
        res.status(500).send( 'Internal Server Error' );
        return;
      }
      console.log(results.length);
  // אם יש תוצאות מהשאילתה, משתמש מחובר
      if (results.length > 0) {

        res.status(200).send('המשתמש מחובר בהצלחה' );
      } else {
        res.status(401).send( 'שם משתמש או סיסמה לא תקינים' );
      }
    });
  });
>>>>>>> dd6f51d050f00cb5889a1cfeaac680f85eaa73ab
  


  async function updateUser(userId, updatedUserData) {
    try {
      const result = await con.promise().query('UPDATE users SET ? WHERE id = ?', [updatedUserData, userId]);
      return result.affectedRows;
    } catch (error) {
        throw error;
    }
  }
  
<<<<<<< HEAD
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
=======
  router.put('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    try {
      const rowsAffected = await updateUser(userId, updatedUserData);
      if (rowsAffected > 0) {
        res.status(200).send(`User with ID ${userId} updated successfully`);
      } else {
        res.status(404).send(`User with ID ${userId} not found`);
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });
  
async function deleteUser(userId) {
    try {
        const result = await con.promise().query('DELETE FROM users WHERE id = ?', userId);
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
}
router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const rowsAffected = await deleteUser(userId);
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
>>>>>>> dd6f51d050f00cb5889a1cfeaac680f85eaa73ab

module.exports = router;