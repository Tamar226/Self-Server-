require('dotenv').config();
const cors = require('cors');
const express = require('express');

const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const registerRouter = require('./routes/register');

const server = express();
const host = process.env.MYSQL_HOST;
const port = process.env.PORT;

server.use((cors({ origin:'*'})));
server.use(express.json());

server.use('/users', usersRouter);
server.use('/todos', todosRouter);
server.use('/posts', postsRouter);
server.use('/comments', commentsRouter);
server.use('register', registerRouter);

server.listen(port, host, () => {
    console.log(`listening to requests at http://${host}:${port}`);
});


