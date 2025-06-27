const Matricula = require('../models/matricula.model');

exports.findAll = async (req, res) => {
  try {
    const matriculas = await Matricula.findAll();
    
    if (!matriculas || matriculas.length === 0) {
      return res.status(200).json({
        error: false,
        message: 'Nenhuma matrícula cadastrada no sistema.',
        data: []
      });
    }
    
    res.status(200).json({
      error: false,
      message: `${matriculas.length} matrícula(s) encontrada(s).`,
      data: matriculas
    });
  } catch (error) {
    console.error('Erro ao buscar matrículas:', error);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao buscar as matrículas.' 
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const matricula = await Matricula.findById(req.params.id);
    if (!matricula) {
      return res.status(404).json({ 
        error: true,
        message: 'Matrícula não encontrada' 
      });
    }
    res.status(200).json({
      error: false,
      data: matricula
    });
  } catch (error) {
    console.error(`Erro ao buscar matrícula: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao buscar a matrícula.' 
    });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.aluno_id || !req.body.turma || !req.body.data_matricula) {
      return res.status(400).json({ 
        error: true,
        message: 'Aluno ID, turma e data de matrícula são obrigatórios' 
      });
    }
    
    const matricula = await Matricula.create(req.body);
    res.status(201).json({
      error: false,
      message: 'Matrícula criada com sucesso!',
      data: matricula
    });
  } catch (error) {
    console.error(`Erro ao criar matrícula: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao criar a matrícula.' 
    });
  }
};

exports.update = async (req, res) => {
  try {
    const matricula = await Matricula.findById(req.params.id);
    if (!matricula) {
      return res.status(404).json({ 
        error: true,
        message: 'Matrícula não encontrada' 
      });
    }
    
    const updatedMatricula = await Matricula.update(req.params.id, req.body);
    res.status(200).json({
      error: false,
      message: 'Matrícula atualizada com sucesso!',
      data: updatedMatricula
    });
  } catch (error) {
    console.error(`Erro ao atualizar matrícula: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao atualizar a matrícula.' 
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const matricula = await Matricula.findById(req.params.id);
    if (!matricula) {
      return res.status(404).json({ 
        error: true,
        message: 'Matrícula não encontrada' 
      });
    }
    
    await Matricula.delete(req.params.id);
    res.status(200).json({ 
      error: false,
      message: 'Matrícula excluída com sucesso' 
    });
  } catch (error) {
    console.error(`Erro ao excluir matrícula: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao excluir a matrícula.' 
    });
  }
};