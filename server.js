const express = require('express');

const server = express();

server.use(express.json());
server.use(logger);

const actionRouter = require("./data/routes/actionRouter.js");
const projectRouter = require("./data/routes/projectRouter.js");

server.use("/api/actions", actionRouter);
server.use("/api/projects", projectRouter)


server.get('/', (req, res) => {
    res.send(`<h1>Here is The Sprint Challenge<h1>`);
});


function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

module.exports = server;