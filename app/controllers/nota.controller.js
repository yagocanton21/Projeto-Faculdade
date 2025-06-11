const Nota = require('../models/nota.model');

exports.findAll = async (req, res) => {
  try {
    const notas = await Nota.findAll();
    res.status(200).json(notas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const nota = await Nota.findById(req.params.id);
    if (!nota) {
      return res.status(404).json({ message: 'Nota não encontrada' });
    }
    res.status(200).json(nota);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findByAluno = async (req, res) => {
  try {
    const notas = await Nota.findByAlunoId(req.params.id);
    res.status(200).json(notas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.aluno_id || !req.body.disciplina_id || req.body.valor === undefined) {
      return res.status(400).json({ message: 'Aluno, disciplina e valor são obrigatórios' });
    }
    
    const nota = await Nota.create(req.body);
    res.status(201).json(nota);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const nota = await Nota.findById(req.params.id);
    if (!nota) {
      return res.status(404).json({ message: 'Nota não encontrada' });
    }
    
    const updatedNota = await Nota.update(req.params.id, req.body);
    res.status(200).json(updatedNota);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const nota = await Nota.findById(req.params.id);
    if (!nota) {
      return res.status(404).json({ message: 'Nota não encontrada' });
    }
    
    await Nota.delete(req.params.id);
    res.status(200).json({ message: 'Nota excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};