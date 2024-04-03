const dotenv = require('dotenv');
const postsDataBase = require('../../database/postsHandlerDB')
dotenv.config();

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('hiii');
    try {
        const result = await postsDataBase.getAllPosts();
        if (result.hasError) {
            res.status(404).send('Error');
        }
        else {
            res.status(200).send('success get all posts');
        }

    } catch (error) {
        console.error('Error retrieving posts:', error);
        // res.status(500).send('Internal Server Error');
    }
});

router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    try {
        const result = await postsDataBase.getPostById(postId);
        if (result.hasError) {
            res.status(404).send('Error');
        }
        else {
            res.status(200).send([`success get post by id: ${postId}`,result]);
        }
    } catch (error) {
        console.error(`Error retrieving post with ID ${postId}:`, error);
        // res.status(500).send('Internal Server Error');
    }

});

router.post('/', async (req, res) => {
    const newPost = req.body;
    try {
        const result = await postsDataBase.addPost(newPost);
        if (result.insertId > 0) {
            res.status(201).send(`Todo added with ID: ${todoId}`);
        } else {
            res.status(404).send('Error adding post');
        }
    } catch (error) {
        console.error('Error adding post:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.put('/:postId', async (req, res) => {
    const postId = req.params.postId;
    const updatedPostData = req.body;
    try {
        const result = await postsDataBase.updatePost(postId, updatedPostData);
        if (result.affectedRows > 0) {
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
        const result = await postsDataBase.deletePost(postId);
        if (result.affectedRows > 0) {
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
