const Presenca = require('../models/presenca.model');

exports.findAll = async (req, res) => {
  try {
    const presencas = await Presenca.findAll();
    
    if (!presencas || presencas.length === 0) {
      return res.status(200).json({
        error: false,
        message: 'Nenhuma presenca cadastrada no sistema.',
        data: []
      });
    }
    
    res.status(200).json({
      error: false,
      message: `${presencas.length} presenca(s) encontrada(s).`,
      data: presencas
    });
  } catch (error) {
    console.error('Erro ao buscar presencas:', error);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao buscar as presencas.' 
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const presenca = await Presenca.findById(req.params.id);
    if (!presenca) {
      return res.status(404).json({ 
        error: true,
        message: 'Presenca nao encontrada' 
      });
    }
    res.status(200).json({
      error: false,
      data: presenca
    });
  } catch (error) {
    console.error(`Erro ao buscar presenca: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao buscar a presenca.' 
    });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.aluno_id || !req.body.data_aula) {
      return res.status(400).json({ 
        error: true,
        message: 'Aluno ID e data da aula sao obrigatorios' 
      });
    }
    
    const presenca = await Presenca.create(req.body);
    res.status(201).json({
      error: false,
      message: 'Presenca criada com sucesso!',
      data: presenca
    });
  } catch (error) {
    console.error(`Erro ao criar presenca: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao criar a presenca.' 
    });
  }
};

exports.update = async (req, res) => {
  try {
    const presenca = await Presenca.findById(req.params.id);
    if (!presenca) {
      return res.status(404).json({ 
        error: true,
        message: 'Presenca nao encontrada' 
      });
    }
    
    const updatedPresenca = await Presenca.update(req.params.id, req.body);
    res.status(200).json({
      error: false,
      message: 'Presenca atualizada com sucesso!',
      data: updatedPresenca
    });
  } catch (error) {
    console.error(`Erro ao atualizar presenca: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao atualizar a presenca.' 
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const presenca = await Presenca.findById(req.params.id);
    if (!presenca) {
      return res.status(404).json({ 
        error: true,
        message: 'Presenca nao encontrada' 
      });
    }
    
    await Presenca.delete(req.params.id);
    res.status(200).json({ 
      error: false,
      message: 'Presenca excluida com sucesso' 
    });
  } catch (error) {
    console.error(`Erro ao excluir presenca: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao excluir a presenca.' 
    });
  }
};