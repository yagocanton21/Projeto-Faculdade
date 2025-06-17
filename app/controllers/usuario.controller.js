const Usuario = require('../models/usuario.model');

// Criar e salvar um novo usuário
exports.criar = async (req, res) => {
  try {
    // Validar requisição
    if (!req.body.nome || !req.body.email || !req.body.senha || !req.body.tipo) {
      return res.status(400).json({
        error: true,
        message: 'Os campos nome, email, senha e tipo são obrigatórios!'
      });
    }

    // Verificar se o email já está em uso
    const usuarioExistente = await Usuario.buscarPorEmail(req.body.email);
    if (usuarioExistente) {
      return res.status(400).json({
        error: true,
        message: 'Este email já está em uso!'
      });
    }

    // Criar um usuário
    const usuario = new Usuario({
      nome: req.body.nome,
      email: req.body.email,
      senha: req.body.senha, // Idealmente, esta senha seria criptografada antes de salvar
      tipo: req.body.tipo,
      ativo: req.body.ativo !== undefined ? req.body.ativo : true
    });

    // Salvar usuário no banco de dados
    const novoUsuario = await Usuario.criar(usuario);
    
    // Remover a senha do objeto de resposta
    const { senha, ...usuarioSemSenha } = novoUsuario;
    
    res.status(201).json({
      error: false,
      message: 'Usuário criado com sucesso!',
      data: usuarioSemSenha
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message || 'Ocorreu um erro ao criar o usuário.'
    });
  }
};

// Buscar todos os usuários
exports.buscarTodos = async (req, res) => {
  try {
    const usuarios = await Usuario.buscarTodos();
    
    res.status(200).json({
      error: false,
      data: usuarios
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message || 'Ocorreu um erro ao buscar os usuários.'
    });
  }
};

// Buscar um único usuário pelo ID
exports.buscarPorId = async (req, res) => {
  try {
    const usuario = await Usuario.buscarPorId(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({
        error: true,
        message: `Usuário com ID ${req.params.id} não encontrado.`
      });
    }
    
    res.status(200).json({
      error: false,
      data: usuario
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message || 'Ocorreu um erro ao buscar o usuário.'
    });
  }
};

// Atualizar um usuário pelo ID
exports.atualizar = async (req, res) => {
  try {
    // Validar requisição
    if (!req.body.nome || !req.body.email || !req.body.tipo) {
      return res.status(400).json({
        error: true,
        message: 'Os campos nome, email e tipo são obrigatórios!'
      });
    }

    // Verificar se o usuário existe
    const usuarioExistente = await Usuario.buscarPorId(req.params.id);
    if (!usuarioExistente) {
      return res.status(404).json({
        error: true,
        message: `Usuário com ID ${req.params.id} não encontrado.`
      });
    }

    // Verificar se o novo email já está em uso por outro usuário
    if (req.body.email !== usuarioExistente.email) {
      const emailEmUso = await Usuario.buscarPorEmail(req.body.email);
      if (emailEmUso) {
        return res.status(400).json({
          error: true,
          message: 'Este email já está em uso por outro usuário!'
        });
      }
    }

    // Atualizar usuário
    const usuario = {
      nome: req.body.nome,
      email: req.body.email,
      tipo: req.body.tipo,
      ativo: req.body.ativo !== undefined ? req.body.ativo : usuarioExistente.ativo
    };

    const atualizado = await Usuario.atualizar(req.params.id, usuario);
    
    if (atualizado) {
      res.status(200).json({
        error: false,
        message: 'Usuário atualizado com sucesso!',
        data: { id: req.params.id, ...usuario }
      });
    } else {
      res.status(500).json({
        error: true,
        message: 'Erro ao atualizar o usuário.'
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message || 'Ocorreu um erro ao atualizar o usuário.'
    });
  }
};

// Atualizar a senha de um usuário
exports.atualizarSenha = async (req, res) => {
  try {
    // Validar requisição
    if (!req.body.senha) {
      return res.status(400).json({
        error: true,
        message: 'A nova senha é obrigatória!'
      });
    }

    // Verificar se o usuário existe
    const usuarioExistente = await Usuario.buscarPorId(req.params.id);
    if (!usuarioExistente) {
      return res.status(404).json({
        error: true,
        message: `Usuário com ID ${req.params.id} não encontrado.`
      });
    }

    // Atualizar senha
    const atualizado = await Usuario.atualizarSenha(req.params.id, req.body.senha);
    
    if (atualizado) {
      res.status(200).json({
        error: false,
        message: 'Senha atualizada com sucesso!'
      });
    } else {
      res.status(500).json({
        error: true,
        message: 'Erro ao atualizar a senha.'
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message || 'Ocorreu um erro ao atualizar a senha.'
    });
  }
};

// Excluir um usuário pelo ID
exports.excluir = async (req, res) => {
  try {
    // Verificar se o usuário existe
    const usuarioExistente = await Usuario.buscarPorId(req.params.id);
    if (!usuarioExistente) {
      return res.status(404).json({
        error: true,
        message: `Usuário com ID ${req.params.id} não encontrado.`
      });
    }

    // Excluir usuário
    const excluido = await Usuario.excluir(req.params.id);
    
    if (excluido) {
      res.status(200).json({
        error: false,
        message: 'Usuário excluído com sucesso!'
      });
    } else {
      res.status(500).json({
        error: true,
        message: 'Erro ao excluir o usuário.'
      });
    }
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message || 'Ocorreu um erro ao excluir o usuário.'
    });
  }
};