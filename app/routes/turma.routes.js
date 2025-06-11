const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turma.controller');

// Retrieve all turmas
router.get('/', turmaController.findAll);

// Retrieve a single turma with id
router.get('/:id', turmaController.findOne);

// Create a new turma
router.post('/', turmaController.create);

// Update a turma with id
router.put('/:id', turmaController.update);

// Delete a turma with id
router.delete('/:id', turmaController.delete);

module.exports = router;