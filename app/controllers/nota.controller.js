const Nota = require('../models/nota.model');

exports.findAll = async (req, res) => {
  try {
    const notas = await Nota.findAll();
    
    if (!notas || notas.length === 0) {
      return res.status(200).json({
        error: false,
        message: 'Nenhuma nota cadastrada no sistema.',
        data: []
      });
    }
    
    res.status(200).json({
      error: false,
      message: `${notas.length} nota(s) encontrada(s).`,
      data: notas
    });
  } catch (error) {
    console.error('Erro ao buscar notas:', error);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao buscar as notas.' 
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const nota = await Nota.findById(req.params.id);
    if (!nota) {
      return res.status(404).json({ 
        error: true,
        message: 'Nota nao encontrada' 
      });
    }
    res.status(200).json({
      error: false,
      data: nota
    });
  } catch (error) {
    console.error(`Erro ao buscar nota: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao buscar a nota.' 
    });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.aluno_id || !req.body.disciplina || !req.body.valor) {
      return res.status(400).json({ 
        error: true,
        message: 'Aluno ID, disciplina e valor sao obrigatorios' 
      });
    }
    
    const nota = await Nota.create(req.body);
    res.status(201).json({
      error: false,
      message: 'Nota criada com sucesso!',
      data: nota
    });
  } catch (error) {
    console.error(`Erro ao criar nota: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao criar a nota.' 
    });
  }
};

exports.update = async (req, res) => {
  try {
    const nota = await Nota.findById(req.params.id);
    if (!nota) {
      return res.status(404).json({ 
        error: true,
        message: 'Nota nao encontrada' 
      });
    }
    
    const updatedNota = await Nota.update(req.params.id, req.body);
    res.status(200).json({
      error: false,
      message: 'Nota atualizada com sucesso!',
      data: updatedNota
    });
  } catch (error) {
    console.error(`Erro ao atualizar nota: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao atualizar a nota.' 
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const nota = await Nota.findById(req.params.id);
    if (!nota) {
      return res.status(404).json({ 
        error: true,
        message: 'Nota nao encontrada' 
      });
    }
    
    await Nota.delete(req.params.id);
    res.status(200).json({ 
      error: false,
      message: 'Nota excluida com sucesso' 
    });
  } catch (error) {
    console.error(`Erro ao excluir nota: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao excluir a nota.' 
    });
  }
};