const Professor = require('../models/professor.model');

exports.findAll = async (req, res) => {
  try {
    const professores = await Professor.findAll();
    
    if (!professores || professores.length === 0) {
      return res.status(200).json({
        error: false,
        message: 'Nenhum professor cadastrado no sistema.',
        data: []
      });
    }
    
    res.status(200).json({
      error: false,
      message: `${professores.length} professor(es) encontrado(s).`,
      data: professores
    });
  } catch (error) {
    console.error('Erro ao buscar professores:', error);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao buscar os professores.' 
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) {
      return res.status(404).json({ 
        error: true,
        message: 'Professor não encontrado' 
      });
    }
    res.status(200).json({
      error: false,
      data: professor
    });
  } catch (error) {
    console.error(`Erro ao buscar professor: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao buscar o professor.' 
    });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.nome || !req.body.email || !req.body.telefone) {
      return res.status(400).json({ 
        error: true,
        message: 'Nome, email e telefone são obrigatórios' 
      });
    }
    
    const professor = await Professor.create(req.body);
    
    // Broadcast WebSocket para notificar todos os clientes
    req.app.locals.broadcast('professor:created', { id: professor.id, nome: professor.nome });
    
    res.status(201).json({
      error: false,
      message: 'Professor criado com sucesso!',
      data: professor
    });
  } catch (error) {
    console.error(`Erro ao criar professor: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao criar o professor.' 
    });
  }
};

exports.update = async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) {
      return res.status(404).json({ 
        error: true,
        message: 'Professor não encontrado' 
      });
    }
    
    const updatedProfessor = await Professor.update(req.params.id, req.body);
    
    // Broadcast WebSocket para notificar todos os clientes
    req.app.locals.broadcast('professor:updated', { id: req.params.id, nome: updatedProfessor.nome });
    
    res.status(200).json({
      error: false,
      message: 'Professor atualizado com sucesso!',
      data: updatedProfessor
    });
  } catch (error) {
    console.error(`Erro ao atualizar professor: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao atualizar o professor.' 
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) {
      return res.status(404).json({ 
        error: true,
        message: 'Professor não encontrado' 
      });
    }
    
    await Professor.delete(req.params.id);
    
    // Broadcast WebSocket para notificar todos os clientes
    req.app.locals.broadcast('professor:deleted', { id: req.params.id });
    
    res.status(200).json({ 
      error: false,
      message: 'Professor excluído com sucesso' 
    });
  } catch (error) {
    console.error(`Erro ao excluir professor: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao excluir o professor.' 
    });
  }
};