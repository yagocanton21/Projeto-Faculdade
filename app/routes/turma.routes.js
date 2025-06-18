const express = require('express');
const router = express.Router();
const turmaController = require('../controllers/turma.controller');

// Listar todas as turmas
router.get('/', turmaController.findAll);

// Buscar uma turma por ID
router.get('/:id', turmaController.findOne);

// Criar uma nova turma
router.post('/', turmaController.create);

// Atualizar uma turma
router.put('/:id', turmaController.update);

// Excluir uma turma
router.delete('/:id', turmaController.delete);

module.exports = router;