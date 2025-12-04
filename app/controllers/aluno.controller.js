const Aluno = require('../models/aluno.model');

exports.findAll = async (req, res) => {
  try {
    const alunos = await Aluno.findAll();
    
    if (!alunos || alunos.length === 0) {
      return res.status(200).json({
        error: false,
        message: 'Nenhum aluno cadastrado no sistema.',
        data: []
      });
    }
    
    res.status(200).json({
      error: false,
      message: `${alunos.length} aluno(s) encontrado(s).`,
      data: alunos
    });
  } catch (error) {
    console.error('Erro no controlador findAll:', error);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao buscar os alunos.' 
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) {
      return res.status(404).json({ 
        error: true,
        message: 'Aluno não encontrado' 
      });
    }
    res.status(200).json({
      error: false,
      data: aluno
    });
  } catch (error) {
    console.error(`Erro no controlador findOne: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao buscar o aluno.' 
    });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.nome || !req.body.data_nascimento) {
      return res.status(400).json({ 
        error: true,
        message: 'Nome e data de nascimento são obrigatórios' 
      });
    }
    
    const aluno = await Aluno.create(req.body);
    
    // Broadcast WebSocket para notificar todos os clientes
    console.log('Tentando fazer broadcast...');
    if (req.app.locals.broadcast) {
      req.app.locals.broadcast('aluno:created', { id: aluno.id, nome: aluno.nome });
    } else {
      console.error('ERRO: broadcast não está disponível!');
    }
    
    res.status(201).json({
      error: false,
      message: 'Aluno criado com sucesso!',
      data: aluno
    });
  } catch (error) {
    console.error(`Erro no controlador create: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao criar o aluno.' 
    });
  }
};

exports.update = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) {
      return res.status(404).json({ 
        error: true,
        message: 'Aluno não encontrado' 
      });
    }
    
    const updatedAluno = await Aluno.update(req.params.id, req.body);
    
    // Broadcast WebSocket para notificar todos os clientes
    req.app.locals.broadcast('aluno:updated', { id: req.params.id, nome: updatedAluno.nome });
    
    res.status(200).json({
      error: false,
      message: 'Aluno atualizado com sucesso!',
      data: updatedAluno
    });
  } catch (error) {
    console.error(`Erro no controlador update: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao atualizar o aluno.' 
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) {
      return res.status(404).json({ 
        error: true,
        message: 'Aluno não encontrado' 
      });
    }
    
    await Aluno.delete(req.params.id);
    
    // Broadcast WebSocket para notificar todos os clientes
    req.app.locals.broadcast('aluno:deleted', { id: req.params.id });
    
    res.status(200).json({ 
      error: false,
      message: 'Aluno excluído com sucesso' 
    });
  } catch (error) {
    console.error(`Erro no controlador delete: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao excluir o aluno.' 
    });
  }
};