const pool = require('../config/db.config');

class Presenca {
  static async findAll() {
    try {
      const [rows] = await pool.execute(`
        SELECT p.*, a.nome as aluno_nome 
        FROM presencas p 
        JOIN alunos a ON p.aluno_id = a.id
      `);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar presenças:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.execute(`
        SELECT p.*, a.nome as aluno_nome 
        FROM presencas p 
        JOIN alunos a ON p.aluno_id = a.id 
        WHERE p.id = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar presença com ID ${id}:`, error);
      throw error;
    }
  }

  static async create(presenca) {
    try {
      const { aluno_id, data_aula, presente, observacao } = presenca;
      const [result] = await pool.execute(
        'INSERT INTO presencas (aluno_id, data_aula, presente, observacao) VALUES (?, ?, ?, ?)',
        [aluno_id, data_aula, presente, observacao]
      );
      return { id: result.insertId, ...presenca };
    } catch (error) {
      console.error('Erro ao criar presença:', error);
      throw error;
    }
  }

  static async update(id, presenca) {
    try {
      const { aluno_id, data_aula, presente, observacao } = presenca;
      await pool.execute(
        'UPDATE presencas SET aluno_id = ?, data_aula = ?, presente = ?, observacao = ? WHERE id = ?',
        [aluno_id, data_aula, presente, observacao, id]
      );
      return { id, ...presenca };
    } catch (error) {
      console.error(`Erro ao atualizar presença com ID ${id}:`, error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      await pool.execute('DELETE FROM presencas WHERE id = ?', [id]);
      return { id };
    } catch (error) {
      console.error(`Erro ao excluir presença com ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Presenca;