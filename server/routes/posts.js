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

async function getAllPosts() {
    console.log('byyy');
    const [allPosts] = await con.promise().query('SELECT * FROM posts');
    console.log(allPosts);
    return allPosts;
}
router.get('/', async (req, res) => {
    console.log('hiii');
    try {
        const allPosts = await getAllPosts();
        res.send(allPosts);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).send('Internal Server Error');
    }
});
async function getPostById(postId) {
    try {
        const [post] = await con.promise().query('SELECT * FROM posts WHERE id = ?', [postId]);
        if (post.length === 0) {
            throw new Error(`Post with ID ${postId} not found`);
        }
        return post[0];
    } catch (error) {
        throw error;
    }
}
router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await getPostById(postId);
        res.send(post);
    } catch (error) {
        console.error(`Error retrieving post with ID ${postId}:`, error);
        res.status(500).send('Internal Server Error');
    }
});
async function addPost(newPost) {
    try {
        console.log('hiii');
        const result = await con.promise().query(`INSERT INTO posts (userID, title,body) VALUES ('${newPost.userId}', '${newPost.title}','${newPost.body}')`);
        return result.insertId;
    } catch (error) {
        throw error;
    }
}
router.post('/', async (req, res) => {
    const newPost = req.body;
    try {
        const postId = await addPost(newPost);
        res.status(201).send(`post added with ID: ${postId}`);
    } catch (error) {
        console.error('Error adding post:', error);
        res.status(500).send('Internal Server Error');
    }
});
async function updatePost(postId, updatedPostData) {
    try {
      const result = await con.promise().query('UPDATE posts SET ? WHERE id = ?', [updatedPostData, postId]);
      return result.affectedRows;
    } catch (error) {
        throw error;
    }
  }
  
  router.put('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const updatedPostData = req.body;
    try {
      const rowsAffected = await updatePost(postId, updatedPostData);
      if (rowsAffected > 0) {
        res.status(200).send(`Post with ID ${postId} updated successfully`);
      } else {
        res.status(404).send(`Post with ID ${postId} not found`);
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });
  
async function deletePost(postId) {
    try {
        const result = await con.promise().query('DELETE FROM posts WHERE id = ?', postId);
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
}
router.delete('/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const rowsAffected = await deletePost(postId);
        if (rowsAffected > 0) {
            res.status(200).send(`Post with ID ${postId} deleted successfully`);
        } else {
            res.status(404).send(`Post with ID ${postId} not found`);
        }
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
