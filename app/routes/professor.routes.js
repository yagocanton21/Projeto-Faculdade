const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professor.controller');

// Buscar todos os professores
router.get('/', professorController.findAll);

// Buscar um professor pelo ID
router.get('/:id', professorController.findOne);

// Criar um novo professor
router.post('/', professorController.create);

// Atualizar um professor pelo ID
router.put('/:id', professorController.update);

// Excluir um professor pelo ID
router.delete('/:id', professorController.delete);

module.exports = router;