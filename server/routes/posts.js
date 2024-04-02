const dotenv = require('dotenv');
const postsDataBase=require('../../database/postsHandlerDB')
dotenv.config();

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('hiii');
    try {
        const allPosts = await postsDataBase.getAllPosts();
        if (result.hasError){
            res.status(404).send('Error');
        }
        res.send(allPosts);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await postsDataBase.getPostById(postId);
        if (result.hasError){
            res.status(404).send('Error');
        }
        res.send(post);
    } catch (error) {
        console.error(`Error retrieving post with ID ${postId}:`, error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', async (req, res) => {
    const newPost = req.body;
    try {
        const postId = await postsDataBase.addPost(newPost);
        res.status(201).send(`post added with ID: ${postId}`);
    } catch (error) {
        console.error('Error adding post:', error);
        res.status(500).send('Internal Server Error');
    }
});

  
  router.put('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const updatedPostData = req.body;
    try {
      const rowsAffected = await postsDataBase.updatePost(postId, updatedPostData);
      if (rowsAffected > 0) {
        res.status(200).send(`Post with ID ${postId} updated successfully`);
      } else {
        res.status(404).send(`Post with ID ${postId} not found`);
      }
    } catch (error) {
      res.status(500).send('Internal Server Error');
    }
  });
  

router.delete('/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const rowsAffected = await postsDataBase.deletePost(postId);
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
