const Turma = require('../models/turma.model');

exports.findAll = async (req, res) => {
  try {
    const turmas = await Turma.findAll();
    res.status(200).json(turmas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    res.status(200).json(turma);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.nome || !req.body.ano_letivo) {
      return res.status(400).json({ message: 'Nome e ano letivo são obrigatórios' });
    }
    
    const turma = await Turma.create(req.body);
    res.status(201).json(turma);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    
    const updatedTurma = await Turma.update(req.params.id, req.body);
    res.status(200).json(updatedTurma);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const turma = await Turma.findById(req.params.id);
    if (!turma) {
      return res.status(404).json({ message: 'Turma não encontrada' });
    }
    
    await Turma.delete(req.params.id);
    res.status(200).json({ message: 'Turma excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};