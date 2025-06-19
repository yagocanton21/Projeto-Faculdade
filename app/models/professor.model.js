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
      const { nome, email, telefone } = professor;
      const [result] = await pool.execute(
        'INSERT INTO professores (nome, email, telefone) VALUES (?, ?, ?)',
        [nome, email, telefone]
      );
      return { id: result.insertId, ...professor };
    } catch (error) {
      console.error('Erro ao criar professor:', error);
      throw error;
    }
  }

  static async update(id, professor) {
    try {
      const { nome, email, telefone } = professor;
      await pool.execute(
        'UPDATE professores SET nome = ?, email = ?, telefone = ? WHERE id = ?',
        [nome, email, telefone, id]
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