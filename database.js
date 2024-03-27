import mysql from 'mysql2';
import dotenv from 'dotenv';
import faker from 'faker.js';
dotenv.config();

// async function createDb() {
//     const connection = mysql.createConnection({
//         host: process.env.MYSQL_HOST,
//         user: process.env.MYSQL_USER,
//         password: process.env.MYSQL_PASSWORD
//     });
//     await connection.promise().query('CREATE DATABASE mydb');
// };

var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});
function createTables() {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        //create users table
        var createUsersTableQuery = "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY,  name VARCHAR(255) NOT NULL,username VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL,street VARCHAR(255),city VARCHAR(255),zipcode VARCHAR(255),phone VARCHAR(255),website VARCHAR(255),companyName VARCHAR(255))";
        con.query(createUsersTableQuery, function (err, result) {
            if (err) throw err;
            console.log("Table created!");
        });
        //create todos table
        var createTodosTableQuery = "CREATE TABLE IF NOT EXISTS todos ( userId INT NOT NULL,id INT NOT NULL,title VARCHAR(255) NOT NULL,completed BOOLEAN NOT NULL,PRIMARY KEY (id) )";
        con.query(createTodosTableQuery, function (err, result) {
            if (err) throw err;
            console.log("Table created!");
        });
        //create comments table
        var createCommentsTableQuery = "CREATE TABLE IF NOT EXISTS comments (postId INT NOT NULL, id INT NOT NULL, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL,body TEXT NOT NULL,PRIMARY KEY (id))";
        con.query(createCommentsTableQuery, function (err, result) {
            if (err) throw err;
            console.log("Table created!");
        });
        //create posts table
        var createPostsTableQuery = "CREATE TABLE IF NOT EXISTS posts (userId INT NOT NULL,id INT NOT NULL,title VARCHAR(255) NOT NULL,body TEXT NOT NULL,PRIMARY KEY (id))";
        con.query(createPostsTableQuery, function (err, result) {
            if (err) throw err;
            console.log("Table created!");
        });
       
        //create albums table
        var createAlbumsTableQuery = "CREATE TABLE IF NOT EXISTS albums ( userId INT NOT NULL,id INT NOT NULL,title VARCHAR(255) NOT NULL,  PRIMARY KEY (id))";
        con.query(createAlbumsTableQuery, function (err, result) {
            if (err) throw err;
            console.log("Table created!");
        });
        //create photos table
        var createPhotosTableQuery = "CREATE TABLE IF NOT EXISTS photos (   albumId INT NOT NULL, id INT NOT NULL, title VARCHAR(255) NOT NULL,     url VARCHAR(255) NOT NULL,    thumbnailUrl VARCHAR(255) NOT NULL, PRIMARY KEY (id))";
        con.query(createPhotosTableQuery, function (err, result) {
            if (err) throw err;
            console.log("Table created!");
        });
    });
}

// createDb();
createTables();
 // Create 100 new posts
 for (let i = 0; i < 100; i++) {
    var createPostsQuery = "INSERT INTO posts (userId, id, title, body) VALUES (?, ?, ?, ?)";
    var values = [1, i + 1, faker.lorem.sentence(), faker.lorem.paragraph()];
    con.query(createPostsQuery, values, function (err, result) {
        if (err) throw err;
        console.log("Post " + (i + 1) + " inserted");
    });
}