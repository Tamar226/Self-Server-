const mysql = require('mysql2');

var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    // port: process.env.PORT
});

async function getAllUsers() {
    const [allUsers] = await con.promise().query('SELECT * FROM users');
    return allUsers;
}

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

async function addUser(newUser) {
    try {
        const result = await con.promise().query(`INSERT INTO users (name, username, email,street,city,zipcode, phone, companyName) VALUES ('${newUser.name}', '${newUser.username}', '${newUser.email}', '${newUser.street}','${newUser.city}', '${newUser.zipcode}', '${newUser.phone}','${newUser.companyName}')`);
        if (result[0].insertId > 0) {
            return prepareResult(false, 0, result[0].insertId)
        }
        else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}

async function updateUser(userId, updatedUserData) {
    try {
        const result = await con.promise().query('UPDATE users SET ? WHERE id = ?', [updatedUserData, userId]);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0)
        }
        else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}

async function deleteUser(userId) {
    try {
        const result = await con.promise().query('DELETE FROM users WHERE id = ?', userId);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0)

        } else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}

async function getUserDetails(userName, password) {
    console.log(userName);
    console.log(password);
    try {
        const query = `SELECT name FROM passwords WHERE name = ? AND website = ?`;
        //     `
        //  SELECT *
        //  FROM users
        //  NATURAL JOIN passwords ON users.username = passwords.username
        //  WHERE users.username = ? AND passwords.website = ?;`;
        const user = await con.promise().query(query, [userName, password]);
        console.log(user);
        if (user.length === 0) {
            throw new Error(`User not found`);
        }
        return user[0];
    } catch (error) {
        throw error;
    }
}

function prepareResult(hasErrorT = true, affectedRowsT = 0, insertIdT = -1, dataT = null) {
    const resultdata = {
        hasError: hasErrorT,
        affectedRows: affectedRowsT,
        insertId: insertIdT,
        data: dataT
    }
    return resultdata;
}
module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    getUserDetails
};