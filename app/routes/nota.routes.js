const express = require('express');
const router = express.Router();
const notaController = require('../controllers/nota.controller');

// Retrieve all notas
router.get('/', notaController.findAll);

// Retrieve a single nota with id
router.get('/:id', notaController.findOne);

// Retrieve all notas for a specific aluno
router.get('/aluno/:id', notaController.findByAluno);

// Create a new nota
router.post('/', notaController.create);

// Update a nota with id
router.put('/:id', notaController.update);

// Delete a nota with id
router.delete('/:id', notaController.delete);

module.exports = router;