const mysql = require('mysql2');

var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    // port: process.env.PORT
});

async function getAllPosts() {
    console.log('byyy');
    const [allPosts] = await con.promise().query('SELECT * FROM posts');
    console.log(allPosts);
    return allPosts;
}
async function getPostById(postId) {
    try {
        const [post] = await con.promise().query('SELECT * FROM posts WHERE id = ' + postId);
        if (post.length === 0) {
            throw new Error(`post with ID ${postId} not found`);
        }
        return user[0];
    } catch (error) {
        throw error;
    }
};

async function addPost(newPost) {
    try {
        console.log('hiii');
        const result = await con.promise().query(`INSERT INTO posts (userID, title,body) VALUES ('${newPost.userId}', '${newPost.title}','${newPost.body}')`);
        return result.insertId;
    } catch (error) {
        throw error;
    }
}

async function updatePost(postId, updatedPostData) {
    try {
        const result = await con.promise().query('UPDATE posts SET ? WHERE id = ?', [updatedPostData, postId]);
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
}

async function deletePost(postId) {
    try {
        const result = await con.promise().query('DELETE FROM posts WHERE id = ?', postId);
        return result.affectedRows;
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
module.exports = { getAllPosts,getPostById, addPost, updatePost, deletePost };