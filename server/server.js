require('dotenv').config({ "path": '../../database/.env' });
const cors = require('cors');
const express = require('express');

const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const server = express();
const host = 'localhost'
const port = '8080' 
server.use((cors({ origin: '*' })));
server.use(express.json());

server.use('/users', usersRouter);
server.use('/todos', todosRouter);
server.use('/posts', postsRouter);
server.use('/comments', commentsRouter);

server.get('/', (req, res) => {
    res.send("hello")
})

server.listen(port, host, () => {
    console.log(`listening to requests at http://${host}:${port}`);
});


