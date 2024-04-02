const dotenv = require('dotenv');
const commentsDataBase=require('../../database/commentsHandlerDB')
dotenv.config();

const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const allComments = await commentsDataBase.getAllComments();
        if (result.hasError){
            res.status(404).send('Error');
        }
        res.send(allComments);
    } catch (error) {
        console.error('Error retrieving comments:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    try {
        const comment = await commentsDataBase.getCommentById(commentId);
        if (result.hasError){
            res.status(404).send('Error');
        }
        res.send(comment);
    } catch (error) {
        console.error(`Error retrieving comment with ID ${commentId}:`, error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const newComment = req.body;
    try {
        const commentId = await commentsDataBase.addComment(newComment);
        res.status(201).send(`Comment added with ID: ${commentId}`);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send('Internal Server Error');
    }
});

  
  router.put('/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    const updatedCommentData = req.body;
    try {
      const rowsAffected = await commentsDataBase.updateComment(commentId, updatedCommentData);
      if (rowsAffected > 0) {
        res.status(200).send(`Comment with ID ${commentId} updated successfully`);
      } else {
        res.status(404).send(`Comment with ID ${commentId} not found`);
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });
  

router.delete('/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    try {
        const rowsAffected = await commentsDataBase.deleteComment(commentId);
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
