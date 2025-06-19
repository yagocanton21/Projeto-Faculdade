const pool = require('../config/db.config');

class Nota {
  static async findAll() {
    try {
      const [rows] = await pool.execute(`
        SELECT n.*, a.nome as aluno_nome 
        FROM notas n 
        JOIN alunos a ON n.aluno_id = a.id
      `);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar notas:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.execute(`
        SELECT n.*, a.nome as aluno_nome 
        FROM notas n 
        JOIN alunos a ON n.aluno_id = a.id 
        WHERE n.id = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar nota com ID ${id}:`, error);
      throw error;
    }
  }

  static async create(nota) {
    try {
      const { aluno_id, disciplina, valor, data_avaliacao, observacao } = nota;
      const [result] = await pool.execute(
        'INSERT INTO notas (aluno_id, disciplina, valor, data_avaliacao, observacao) VALUES (?, ?, ?, ?, ?)',
        [aluno_id, disciplina, valor, data_avaliacao, observacao]
      );
      return { id: result.insertId, ...nota };
    } catch (error) {
      console.error('Erro ao criar nota:', error);
      throw error;
    }
  }

  static async update(id, nota) {
    try {
      const { aluno_id, disciplina, valor, data_avaliacao, observacao } = nota;
      await pool.execute(
        'UPDATE notas SET aluno_id = ?, disciplina = ?, valor = ?, data_avaliacao = ?, observacao = ? WHERE id = ?',
        [aluno_id, disciplina, valor, data_avaliacao, observacao, id]
      );
      return { id, ...nota };
    } catch (error) {
      console.error(`Erro ao atualizar nota com ID ${id}:`, error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      await pool.execute('DELETE FROM notas WHERE id = ?', [id]);
      return { id };
    } catch (error) {
      console.error(`Erro ao excluir nota com ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Nota;