const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// Criar um novo usuário
router.post('/', usuarioController.criar);

// Buscar todos os usuários
router.get('/', usuarioController.buscarTodos);

// Buscar um único usuário pelo ID
router.get('/:id', usuarioController.buscarPorId);

// Atualizar um usuário pelo ID
router.put('/:id', usuarioController.atualizar);

// Atualizar a senha de um usuário
router.patch('/:id/senha', usuarioController.atualizarSenha);

// Excluir um usuário pelo ID
router.delete('/:id', usuarioController.excluir);

module.exports = router;