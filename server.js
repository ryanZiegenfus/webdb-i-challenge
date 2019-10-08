const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    db
    .select('*')
    .from('accounts')
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.get("/:id", (req, res) => {
    const id = req.params.id

    db
    .select('*')
    .from('accounts')
    .where('id', id)
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.post("/", (req, res) => {
    const Body = req.body

    db('accounts')
    .insert(Body)
    .then(account => {
        res.status(201).json(account)
    })
    .catch(error => {
        res.status(500).json(error.message)
    })
})

server.delete("/:id", (req, res) => {
    const id = req.params.id

    db('accounts')
    .where({id: id})
    .del()
    .then(accounts => {
        res.status(200).json(accounts)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.put("/:id", (req, res) => {
    const id = req.params.id
    const Body = req.body

    db('accounts')
    .where({id: id})
    .update(Body)
    .then(accounts => {
        res.status(201).json(accounts)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

module.exports = server;