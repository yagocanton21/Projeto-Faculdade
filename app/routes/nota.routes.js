const express = require('express');
const router = express.Router();
const notaController = require('../controllers/nota.controller');

// Buscar todas as notas
router.get('/', notaController.findAll);

// Buscar uma nota pelo ID
router.get('/:id', notaController.findOne);

// Criar uma nova nota
router.post('/', notaController.create);

// Atualizar uma nota pelo ID
router.put('/:id', notaController.update);

// Excluir uma nota pelo ID
router.delete('/:id', notaController.delete);

module.exports = router;