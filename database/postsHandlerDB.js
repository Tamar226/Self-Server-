const mysql = require('mysql2');

var con = mysql.createConnection({
    // host: process.env.MYSQL_HOST,
    // user: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD,
    // database: process.env.MYSQL_DATABASE,
    host: "localhost",
    user: "root",
    password: "T50226",
    database: "mydb"
    // port: process.env.PORT
});

async function getAllPosts() {
    const result = await con.promise().query('SELECT * FROM posts');
    return prepareResults(false,0,0,result);
}
async function getPostById(postId) {
    try {
        const result = await con.promise().query('SELECT * FROM posts WHERE id = ' + postId);
        if (result.length === 0) {
            throw new Error(`post with ID ${postId} not found`);
        }
        return prepareResults(false,0,0,result);
    } catch (error) {
        throw error;
    }
};

async function addPost(newPost) {
    try {
        const result = await con.promise().query(`INSERT INTO posts (userID, title,body) VALUES ('${newPost.userId}', '${newPost.title}','${newPost.body}')`);
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

async function updatePost(postId, updatedPostData) {
    try {
        console.log('huhuh');
        const result = await con.promise().query('UPDATE posts SET ? WHERE id = ?', [updatedPostData, postId]);
        console.log(result[0].affectedRows);
        if (result[0].affectedRows > 0) {
            return prepareResult(false, result[0].affectedRows, 0);
        }
        else {
            return prepareResult(true, 0, 0);
        }
    } catch (error) {
        throw error;
    }
}

async function deletePost(postId) {
    try {
        const result = await con.promise().query('DELETE FROM posts WHERE id = ?', postId);
        if (result[0].affectedRows > 0) {
            console.log(result[0].affectedRows);
            return prepareResult(false, result[0].affectedRows, 0)

        } else {
            return prepareResult(true, 0, 0);
        }
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
    getAllPosts,
    getPostById, 
    addPost, 
    updatePost, 
    deletePost };