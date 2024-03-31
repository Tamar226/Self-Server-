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

async function getAllComments() {
    const [allComments] = await con.promise().query('SELECT * FROM comments');
    console.log(allComments);
    return allComments;
}
router.get('/', async (req, res) => {
    try {
        const allComments = await getAllComments();
        res.send(allComments);
    } catch (error) {
        console.error('Error retrieving comments:', error);
        res.status(500).send('Internal Server Error');
    }
});
async function getCommentById(commentId) {
    try {
        const [comment] = await con.promise().query('SELECT * FROM comments WHERE id = ?', [commentId]);
        if (comment.length === 0) {
            throw new Error(`Comment with ID ${commentId} not found`);
        }
        return comment[0];
    } catch (error) {
        throw error;
    }
}
router.get('/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    try {
        const comment = await getCommentById(commentId);
        res.send(comment);
    } catch (error) {
        console.error(`Error retrieving comment with ID ${commentId}:`, error);
        res.status(500).send('Internal Server Error');
    }
});
async function addComment(newComment) {
    try {
        const result = await con.promise().query(`INSERT INTO comments (postId, name,email,body) VALUES ('${newComment.postId}', '${newComment.name}','${newComment.email}','${newComment.body}')`);
        return result.insertId;
    } catch (error) {
        throw error;
    }
}
router.post('/', async (req, res) => {
    const newComment = req.body;
    try {
        const commentId = await addComment(newComment);
        res.status(201).send(`Comment added with ID: ${commentId}`);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Internal Server Error');
    }
});
async function updateComment(commentId, updatedCommentData) {
    try {
      const result = await con.promise().query('UPDATE comments SET ? WHERE id = ?', [updatedCommentData, commentId]);
      return result.affectedRows;
    } catch (error) {
        throw error;
    }
  }
  
  router.put('/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    const updatedCommentData = req.body;
    try {
      const rowsAffected = await updateComment(commentId, updatedCommentData);
      if (rowsAffected > 0) {
        res.status(200).send(`Comment with ID ${commentId} updated successfully`);
      } else {
        res.status(404).send(`Comment with ID ${commentId} not found`);
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });
  
async function deleteComment(commentId) {
    try {
        const result = await con.promise().query('DELETE FROM comments WHERE id = ?', commentId);
        return result.affectedRows;
    } catch (error) {
        throw error;
    }
}
router.delete('/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    try {
        const rowsAffected = await deleteComment(commentId);
        if (rowsAffected > 0) {
            res.status(200).send(`Comment with ID ${commentId} deleted successfully`);
        } else {
            res.status(404).send(`Comment with ID ${commentId} not found`);
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
