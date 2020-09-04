const express = require('express')
const projectRouter = require('./projects/projects-router')
const server = express()

server.use(express.json())
server.use('/projects', projectRouter)

server.get('/', (req, res) => {
    res.send('<h2>Lets do this sprint challenge</h2>')
})

module.exports = server