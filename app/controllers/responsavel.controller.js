const Responsavel = require('../models/responsavel.model');

exports.findAll = async (req, res) => {
  try {
    const responsaveis = await Responsavel.findAll();
    res.status(200).json(responsaveis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const responsavel = await Responsavel.findById(req.params.id);
    if (!responsavel) {
      return res.status(404).json({ message: 'Responsável não encontrado' });
    }
    res.status(200).json(responsavel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.nome || !req.body.cpf) {
      return res.status(400).json({ message: 'Nome e CPF são obrigatórios' });
    }
    
    const responsavel = await Responsavel.create(req.body);
    res.status(201).json(responsavel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const responsavel = await Responsavel.findById(req.params.id);
    if (!responsavel) {
      return res.status(404).json({ message: 'Responsável não encontrado' });
    }
    
    const updatedResponsavel = await Responsavel.update(req.params.id, req.body);
    res.status(200).json(updatedResponsavel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const responsavel = await Responsavel.findById(req.params.id);
    if (!responsavel) {
      return res.status(404).json({ message: 'Responsável não encontrado' });
    }
    
    await Responsavel.delete(req.params.id);
    res.status(200).json({ message: 'Responsável excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};