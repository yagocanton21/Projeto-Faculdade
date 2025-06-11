const express = require('express');
const router = express.Router();
const disciplinaController = require('../controllers/disciplina.controller');

// Retrieve all disciplinas
router.get('/', disciplinaController.findAll);

// Retrieve a single disciplina with id
router.get('/:id', disciplinaController.findOne);

// Create a new disciplina
router.post('/', disciplinaController.create);

// Update a disciplina with id
router.put('/:id', disciplinaController.update);

// Delete a disciplina with id
router.delete('/:id', disciplinaController.delete);

module.exports = router;