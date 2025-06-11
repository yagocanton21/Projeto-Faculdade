const Disciplina = require('../models/disciplina.model');

exports.findAll = async (req, res) => {
  try {
    const disciplinas = await Disciplina.findAll();
    res.status(200).json(disciplinas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const disciplina = await Disciplina.findById(req.params.id);
    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }
    res.status(200).json(disciplina);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.nome) {
      return res.status(400).json({ message: 'Nome da disciplina é obrigatório' });
    }
    
    const disciplina = await Disciplina.create(req.body);
    res.status(201).json(disciplina);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const disciplina = await Disciplina.findById(req.params.id);
    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }
    
    const updatedDisciplina = await Disciplina.update(req.params.id, req.body);
    res.status(200).json(updatedDisciplina);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const disciplina = await Disciplina.findById(req.params.id);
    if (!disciplina) {
      return res.status(404).json({ message: 'Disciplina não encontrada' });
    }
    
    await Disciplina.delete(req.params.id);
    res.status(200).json({ message: 'Disciplina excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};