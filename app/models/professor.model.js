const pool = require('../config/db.config');

class Professor {
  static async findAll() {
    try {
      const [rows] = await pool.execute('SELECT * FROM professores');
      return rows;
    } catch (error) {
      console.error('Erro ao buscar professores:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM professores WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar professor com ID ${id}:`, error);
      throw error;
    }
  }

  static async create(professor) {
    try {
      const { nome, email, telefone, formacao, data_contratacao } = professor;
      const [result] = await pool.execute(
        'INSERT INTO professores (nome, email, telefone, formacao, data_contratacao) VALUES (?, ?, ?, ?, ?)',
        [nome, email, telefone, formacao, data_contratacao]
      );
      return { id: result.insertId, ...professor };
    } catch (error) {
      console.error('Erro ao criar professor:', error);
      throw error;
    }
  }

  static async update(id, professor) {
    try {
      const { nome, email, telefone, formacao, data_contratacao } = professor;
      await pool.execute(
        'UPDATE professores SET nome = ?, email = ?, telefone = ?, formacao = ?, data_contratacao = ? WHERE id = ?',
        [nome, email, telefone, formacao, data_contratacao, id]
      );
      return { id, ...professor };
    } catch (error) {
      console.error(`Erro ao atualizar professor com ID ${id}:`, error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      await pool.execute('DELETE FROM professores WHERE id = ?', [id]);
      return { id };
    } catch (error) {
      console.error(`Erro ao excluir professor com ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Professor;