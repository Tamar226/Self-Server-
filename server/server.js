require('dotenv').config();
const express = require('express');

const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments')

const server = express();
const host = process.env.MYSQL_HOST;
const port = process.env.PORT;

server.use(express.json());

server.use('/users', usersRouter);
server.use('/todos', todosRouter);
server.use('/posts', postsRouter);
server.use('/comments', commentsRouter)

server.listen(port, host, () => {
    console.log(`listening to requests at http://${host}:${port}`);
});
