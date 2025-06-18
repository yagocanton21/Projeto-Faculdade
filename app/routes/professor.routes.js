const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professor.controller');

// Listar todos os professores
router.get('/', professorController.findAll);

// Buscar um professor por ID
router.get('/:id', professorController.findOne);

// Criar um novo professor
router.post('/', professorController.create);

// Atualizar um professor
router.put('/:id', professorController.update);

// Excluir um professor
router.delete('/:id', professorController.delete);

module.exports = router;