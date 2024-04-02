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

    console.log(allUsers);
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
        return result.insertId;
    } catch (error) {
        throw error;
    }
}

function prepareResult(hasError, affectedRows, insertId) {
    const resultdata = {
        hasError: true,
        affectedRows: 0,
        insertId: -1
    }
    return resultdata;
}
module.exports = { getAllUsers, getUserById, addUser };