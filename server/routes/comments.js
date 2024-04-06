const dotenv = require('dotenv');
const commentsDataBase=require('../../database/commentsHandlerDB')
dotenv.config();

const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const result = await commentsDataBase.getAllComments();
        if (result.hasError) {
            res.status(404).send('Error');
        }
        else {
            res.status(200).send(['success get all comments',result.data]);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    try {
        const result = await commentsDataBase.getCommentById(commentId);
        if (result.hasError) {
            res.status(404).send('Error');
        }
        else {
            res.status(200).send([`success get comment by id: ${commentId}`,result]);
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const newComment = req.body;
    try {
        const result = await commentsDataBase.addComment(newComment);
        if (result.insertId > 0) {
            res.status(201).send(`Comments added with ID: ${result.insertId}`);
        } else {
            res.status(404).send('Error adding comment');
        }
    } catch (error) {
        console.error('Error adding post:', error);
        res.status(500).send('Internal Server Error');
    }
});

  
  router.put('/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    const updatedCommentData = req.body;
    try {
      const result = await commentsDataBase.updateComment(commentId, updatedCommentData);
      if (result.affectedRows > 0) {
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
        const result = await commentsDataBase.deleteComment(commentId);
        if (result.affectedRows > 0) {
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
