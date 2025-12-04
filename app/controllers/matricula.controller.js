const Matricula = require('../models/matricula.model');

exports.findAll = async (req, res) => {
  try {
    const matriculas = await Matricula.findAll();
    
    if (!matriculas || matriculas.length === 0) {
      return res.status(200).json({
        error: false,
        message: 'Nenhuma matricula cadastrada no sistema.',
        data: []
      });
    }
    
    res.status(200).json({
      error: false,
      message: `${matriculas.length} matricula(s) encontrada(s).`,
      data: matriculas
    });
  } catch (error) {
    console.error('Erro ao buscar matriculas:', error);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao buscar as matriculas.' 
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const matricula = await Matricula.findById(req.params.id);
    if (!matricula) {
      return res.status(404).json({ 
        error: true,
        message: 'Matricula nao encontrada' 
      });
    }
    res.status(200).json({
      error: false,
      data: matricula
    });
  } catch (error) {
    console.error(`Erro ao buscar matricula: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao buscar a matricula.' 
    });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.aluno_id || !req.body.turma || !req.body.data_matricula) {
      return res.status(400).json({ 
        error: true,
        message: 'Aluno ID, turma e data de matricula sao obrigatorios' 
      });
    }
    
    const matricula = await Matricula.create(req.body);
    res.status(201).json({
      error: false,
      message: 'Matricula criada com sucesso!',
      data: matricula
    });
  } catch (error) {
    console.error(`Erro ao criar matricula: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao criar a matricula.' 
    });
  }
};

exports.update = async (req, res) => {
  try {
    const matricula = await Matricula.findById(req.params.id);
    if (!matricula) {
      return res.status(404).json({ 
        error: true,
        message: 'Matricula nao encontrada' 
      });
    }
    
    const updatedMatricula = await Matricula.update(req.params.id, req.body);
    res.status(200).json({
      error: false,
      message: 'Matricula atualizada com sucesso!',
      data: updatedMatricula
    });
  } catch (error) {
    console.error(`Erro ao atualizar matricula: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao atualizar a matricula.' 
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const matricula = await Matricula.findById(req.params.id);
    if (!matricula) {
      return res.status(404).json({ 
        error: true,
        message: 'Matricula nao encontrada' 
      });
    }
    
    await Matricula.delete(req.params.id);
    res.status(200).json({ 
      error: false,
      message: 'Matricula excluida com sucesso' 
    });
  } catch (error) {
    console.error(`Erro ao excluir matricula: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao excluir a matricula.' 
    });
  }
};