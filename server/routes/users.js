const express = require('express');
const db = require()
const router = express.Router();

router.get('/', (req, res) => {

    res.send('Hello from all users!');
});

router.get('/:userId', (req, res) => {
    res.send(`Hello student ${req.params.userId}`);
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('posted user');
});

router.delete('/:userId', (req, res) => {
});

module.exports = router;