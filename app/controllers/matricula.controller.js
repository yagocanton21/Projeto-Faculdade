const Matricula = require('../models/matricula.model');

exports.findAll = async (req, res) => {
  try {
    const matriculas = await Matricula.findAll();
    res.status(200).json(matriculas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const matricula = await Matricula.findById(req.params.id);
    if (!matricula) {
      return res.status(404).json({ message: 'Matrícula não encontrada' });
    }
    res.status(200).json(matricula);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.aluno_id || !req.body.turma_id) {
      return res.status(400).json({ message: 'Aluno e turma são obrigatórios' });
    }
    
    const matricula = await Matricula.create(req.body);
    res.status(201).json(matricula);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const matricula = await Matricula.findById(req.params.id);
    if (!matricula) {
      return res.status(404).json({ message: 'Matrícula não encontrada' });
    }
    
    const updatedMatricula = await Matricula.update(req.params.id, req.body);
    res.status(200).json(updatedMatricula);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const matricula = await Matricula.findById(req.params.id);
    if (!matricula) {
      return res.status(404).json({ message: 'Matrícula não encontrada' });
    }
    
    await Matricula.delete(req.params.id);
    res.status(200).json({ message: 'Matrícula excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};