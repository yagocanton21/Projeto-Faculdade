const express = require('express');
const router = express.Router();
const matriculaController = require('../controllers/matricula.controller');

// Buscar todas as matrículas
router.get('/', matriculaController.findAll);

// Buscar uma matrícula pelo ID
router.get('/:id', matriculaController.findOne);

// Criar uma nova matrícula
router.post('/', matriculaController.create);

// Atualizar uma matrícula pelo ID
router.put('/:id', matriculaController.update);

// Excluir uma matrícula pelo ID
router.delete('/:id', matriculaController.delete);

module.exports = router;