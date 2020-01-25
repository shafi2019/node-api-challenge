const express = require('express');

const server = express();

server.use(express.json());

const actionRouter = require('./data/routes/actionRouter');

server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.send(`<h1>Here is The Sprint Challenge<h1>`);
});


module.exports = server;