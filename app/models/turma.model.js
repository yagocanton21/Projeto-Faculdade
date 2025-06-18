const pool = require('../config/db.config');

class Turma {
  static async findAll() {
    try {
      const [rows] = await pool.execute('SELECT * FROM turmas');
      return rows;
    } catch (error) {
      console.error('Erro ao buscar turmas:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM turmas WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar turma com ID ${id}:`, error);
      throw error;
    }
  }

  static async create(turma) {
    try {
      const { nome, ano_letivo, periodo, capacidade_maxima } = turma;
      const [result] = await pool.execute(
        'INSERT INTO turmas (nome, ano_letivo, periodo, capacidade_maxima) VALUES (?, ?, ?, ?)',
        [nome, ano_letivo, periodo, capacidade_maxima]
      );
      return { id: result.insertId, ...turma };
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      throw error;
    }
  }

  static async update(id, turma) {
    try {
      const { nome, ano_letivo, periodo, capacidade_maxima } = turma;
      await pool.execute(
        'UPDATE turmas SET nome = ?, ano_letivo = ?, periodo = ?, capacidade_maxima = ? WHERE id = ?',
        [nome, ano_letivo, periodo, capacidade_maxima, id]
      );
      return { id, ...turma };
    } catch (error) {
      console.error(`Erro ao atualizar turma com ID ${id}:`, error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      await pool.execute('DELETE FROM turmas WHERE id = ?', [id]);
      return { id };
    } catch (error) {
      console.error(`Erro ao excluir turma com ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Turma;