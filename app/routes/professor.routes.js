const express = require('express');
const router = express.Router();
const professorController = require('../controllers/professor.controller');

// Retrieve all professores
router.get('/', professorController.findAll);

// Retrieve a single professor with id
router.get('/:id', professorController.findOne);

// Create a new professor
router.post('/', professorController.create);

// Update a professor with id
router.put('/:id', professorController.update);

// Delete a professor with id
router.delete('/:id', professorController.delete);

module.exports = router;