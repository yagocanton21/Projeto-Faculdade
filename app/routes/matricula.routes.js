const express = require('express');
const router = express.Router();
const matriculaController = require('../controllers/matricula.controller');

// Retrieve all matriculas
router.get('/', matriculaController.findAll);

// Retrieve a single matricula with id
router.get('/:id', matriculaController.findOne);

// Create a new matricula
router.post('/', matriculaController.create);

// Update a matricula with id
router.put('/:id', matriculaController.update);

// Delete a matricula with id
router.delete('/:id', matriculaController.delete);

module.exports = router;