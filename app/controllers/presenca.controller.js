const Presenca = require('../models/presenca.model');

exports.findAll = async (req, res) => {
  try {
    const presencas = await Presenca.findAll();
    
    if (!presencas || presencas.length === 0) {
      return res.status(200).json({
        error: false,
        message: 'Nenhuma presença cadastrada no sistema.',
        data: []
      });
    }
    
    res.status(200).json({
      error: false,
      message: `${presencas.length} presença(s) encontrada(s).`,
      data: presencas
    });
  } catch (error) {
    console.error('Erro ao buscar presenças:', error);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao buscar as presenças.' 
    });
  }
};

exports.findOne = async (req, res) => {
  try {
    const presenca = await Presenca.findById(req.params.id);
    if (!presenca) {
      return res.status(404).json({ 
        error: true,
        message: 'Presença não encontrada' 
      });
    }
    res.status(200).json({
      error: false,
      data: presenca
    });
  } catch (error) {
    console.error(`Erro ao buscar presença: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao buscar a presença.' 
    });
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.body.aluno_id || !req.body.data_aula) {
      return res.status(400).json({ 
        error: true,
        message: 'Aluno ID e data da aula são obrigatórios' 
      });
    }
    
    const presenca = await Presenca.create(req.body);
    res.status(201).json({
      error: false,
      message: 'Presença criada com sucesso!',
      data: presenca
    });
  } catch (error) {
    console.error(`Erro ao criar presença: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao criar a presença.' 
    });
  }
};

exports.update = async (req, res) => {
  try {
    const presenca = await Presenca.findById(req.params.id);
    if (!presenca) {
      return res.status(404).json({ 
        error: true,
        message: 'Presença não encontrada' 
      });
    }
    
    const updatedPresenca = await Presenca.update(req.params.id, req.body);
    res.status(200).json({
      error: false,
      message: 'Presença atualizada com sucesso!',
      data: updatedPresenca
    });
  } catch (error) {
    console.error(`Erro ao atualizar presença: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao atualizar a presença.' 
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const presenca = await Presenca.findById(req.params.id);
    if (!presenca) {
      return res.status(404).json({ 
        error: true,
        message: 'Presença não encontrada' 
      });
    }
    
    await Presenca.delete(req.params.id);
    res.status(200).json({ 
      error: false,
      message: 'Presença excluída com sucesso' 
    });
  } catch (error) {
    console.error(`Erro ao excluir presença: ${error.message}`);
    res.status(500).json({ 
      error: true,
      message: error.message || 'Ocorreu um erro ao excluir a presença.' 
    });
  }
};