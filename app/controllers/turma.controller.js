const Turma = require('../models/turma.model');

exports.findAll = async (req, res) => {
  try {
    const turmas = await Turma.findAll();
    
    if (!turmas || turmas.length === 0) {
      return res.status(200).json({
        error: false,
        message: 'Nenhuma turma cadastrada no sistema.',
        data: []
      });
    }
    
    res.status(200).json({
      error: false,
      message: `${turmas.length} turma(s) encontrada(s).`,
      data: turmas
    });
  } catch (error) {
    console.error('Erro ao buscar turmas:', error);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao buscar as turmas.' 
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ 
        error: true,
        message: 'Turma não encontrada' 
      });
    }
    res.status(200).json({
      error: false,
      data: turma
    });
  } catch (error) {
    console.error(`Erro ao buscar turma: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao buscar a turma.' 
    });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.nome || !req.body.ano_letivo) {
      return res.status(400).json({ 
        error: true,
        message: 'Nome e ano letivo são obrigatórios' 
      });
    }
    
    const turma = await Turma.create(req.body);
    res.status(201).json({
      error: false,
      message: 'Turma criada com sucesso!',
      data: turma
    });
  } catch (error) {
    console.error(`Erro ao criar turma: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao criar a turma.' 
    });
  }
};

exports.update = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ 
        error: true,
        message: 'Turma não encontrada' 
      });
    }
    
    const updatedTurma = await Turma.update(req.params.id, req.body);
    res.status(200).json({
      error: false,
      message: 'Turma atualizada com sucesso!',
      data: updatedTurma
    });
  } catch (error) {
    console.error(`Erro ao atualizar turma: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao atualizar a turma.' 
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ 
        error: true,
        message: 'Turma não encontrada' 
      });
    }
    
    await Turma.delete(req.params.id);
    res.status(200).json({ 
      error: false,
      message: 'Turma excluída com sucesso' 
    });
  } catch (error) {
    console.error(`Erro ao excluir turma: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao excluir a turma.' 
    });
  }
};