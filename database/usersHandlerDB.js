const mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "T50226",
    database: "mydb"
});

async function getAllUsers() {
    const result = await con.promise().query('SELECT * FROM users');
    return prepareResults(false, 0, 0, result);
}

async function getUserById(userId) {
    try {
        const result = await con.promise().query('SELECT * FROM users WHERE id = ?', [userId]);
        if (result.length === 0) {
            throw new Error(`User with ID ${userId} not found`);
        }
        return prepareResults(false, 0, 0, result);
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

async function getUserByUsername(username) {
    return await con.promise().query('SELECT * FROM users WHERE username =?', username);
}
async function getUserDetails(userName, password) {
    try {
        let query = `SELECT username FROM passwords WHERE username = '${userName}' AND password = '${password}'`;
        const result = await con.promise().query(query);
        if (result.length === 0) {
            throw new Error(`User not found`);
        }
        const userDetails = await getUserByUsername(result[0][0].username)
        return prepareResult(false, result[0].affectedRows, 0, userDetails[0][0])
    } catch (error) {
        console.error(error);
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