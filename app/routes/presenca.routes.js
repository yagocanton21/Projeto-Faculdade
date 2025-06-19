const express = require('express');
const router = express.Router();
const presencaController = require('../controllers/presenca.controller');

// Buscar todas as presenças
router.get('/', presencaController.findAll);

// Buscar uma presença pelo ID
router.get('/:id', presencaController.findOne);

// Criar uma nova presença
router.post('/', presencaController.create);

// Atualizar uma presença pelo ID
router.put('/:id', presencaController.update);

// Excluir uma presença pelo ID
router.delete('/:id', presencaController.delete);

module.exports = router;