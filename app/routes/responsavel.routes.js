const express = require('express');
const router = express.Router();
const responsavelController = require('../controllers/responsavel.controller');

// Retrieve all responsaveis
router.get('/', responsavelController.findAll);

// Retrieve a single responsavel with id
router.get('/:id', responsavelController.findOne);

// Create a new responsavel
router.post('/', responsavelController.create);

// Update a responsavel with id
router.put('/:id', responsavelController.update);

// Delete a responsavel with id
router.delete('/:id', responsavelController.delete);

module.exports = router;