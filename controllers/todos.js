const express = require('express')
const router = express.Router()
const Todos = require('../models/todos')

// Index
router.get('/', (req, res) => {
    Todos.find({}, (err, foundTodos) => {
        res.json(foundTodos)
    })
})

// Delete
router.delete('/:id', (req, res) => {
    Todos.findByIdAndRemove(req.params.id, (err, deletedTodo) => {
        res.json(deletedTodo)
    })
})

// Update
router.put('/:id', (req, res) => {
    Todos.findByIdAndUpdate(req.params.id, req.body, { new:true }, (err, updatedTodo) => {
        res.json(updatedTodo)
    })
})

// Create
router.post('/', (req, res) => {
    Todos.create(req.body, (err, createdTodo) => {
        res.json(createdTodo) // .json() will send proper headcers in dresponse so client knows it's json coming back
    })
})

// Show
router.get('/:id', (req, res) => {
    Todos.findById(req.params.id, (err, foundTodo) => {
        res.json(foundTodo)
    })
})

module.exports = router