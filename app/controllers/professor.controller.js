const Professor = require('../models/professor.model');

exports.findAll = async (req, res) => {
  try {
    const professores = await Professor.findAll();
    res.status(200).json(professores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    res.status(200).json(professor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.nome || !req.body.email) {
      return res.status(400).json({ message: 'Nome e email são obrigatórios' });
    }
    
    const professor = await Professor.create(req.body);
    res.status(201).json(professor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    
    const updatedProfessor = await Professor.update(req.params.id, req.body);
    res.status(200).json(updatedProfessor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const professor = await Professor.findById(req.params.id);
    if (!professor) {
      return res.status(404).json({ message: 'Professor não encontrado' });
    }
    
    await Professor.delete(req.params.id);
    res.status(200).json({ message: 'Professor excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};