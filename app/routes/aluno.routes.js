const express = require('express');
const router = express.Router();
const alunoController = require('../controllers/aluno.controller');

// Buscar todos os alunos
router.get('/', alunoController.findAll);

// Buscar um aluno pelo ID
router.get('/:id', alunoController.findOne);

// Criar um novo aluno
router.post('/', alunoController.create);

// Atualizar um aluno pelo ID
router.put('/:id', alunoController.update);

// Excluir um aluno pelo ID
router.delete('/:id', alunoController.delete);

module.exports = router;