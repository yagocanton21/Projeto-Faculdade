const pool = require('../config/db.config');

class Aluno {
  static async findAll() {
    try {
      const [rows] = await pool.execute('SELECT * FROM alunos');
      return rows;
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.execute('SELECT * FROM alunos WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar aluno com ID ${id}:`, error);
      throw error;
    }
  }

  static async create(aluno) {
    try {
      const { nome, data_nascimento, endereco, telefone } = aluno;
      const [result] = await pool.execute(
        'INSERT INTO alunos (nome, data_nascimento, endereco, telefone) VALUES (?, ?, ?, ?)',
        [nome, data_nascimento, endereco, telefone]
      );
      return { id: result.insertId, ...aluno };
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      throw error;
    }
  }

  static async update(id, aluno) {
    try {
      const { nome, data_nascimento, endereco, telefone } = aluno;
      await pool.execute(
        'UPDATE alunos SET nome = ?, data_nascimento = ?, endereco = ?, telefone = ? WHERE id = ?',
        [nome, data_nascimento, endereco, telefone, id]
      );
      return { id, ...aluno };
    } catch (error) {
      console.error(`Erro ao atualizar aluno com ID ${id}:`, error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      await pool.execute('DELETE FROM alunos WHERE id = ?', [id]);
      return { id };
    } catch (error) {
      console.error(`Erro ao excluir aluno com ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Aluno;