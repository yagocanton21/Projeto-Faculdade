const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/aluno.controller');

// Retrieve all alunos
router.get('/', alunoController.findAll);

// Retrieve a single aluno with id
router.get('/:id', alunoController.findOne);

// Create a new aluno
router.post('/', alunoController.create);

// Update an aluno with id
router.put('/:id', alunoController.update);

// Delete an aluno with id
router.delete('/:id', alunoController.delete);

module.exports = router;