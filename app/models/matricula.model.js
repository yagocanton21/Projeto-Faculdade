const pool = require('../config/db.config');

class Matricula {
  static async findAll() {
    try {
      const [rows] = await pool.execute(`
        SELECT m.*, a.nome as aluno_nome 
        FROM matriculas m 
        JOIN alunos a ON m.aluno_id = a.id
      `);
      return rows;
    } catch (error) {
      console.error('Erro ao buscar matrículas:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const [rows] = await pool.execute(`
        SELECT m.*, a.nome as aluno_nome 
        FROM matriculas m 
        JOIN alunos a ON m.aluno_id = a.id 
        WHERE m.id = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      console.error(`Erro ao buscar matrícula com ID ${id}:`, error);
      throw error;
    }
  }

  static async create(matricula) {
    try {
      const { aluno_id, turma, data_matricula, status } = matricula;
      const [result] = await pool.execute(
        'INSERT INTO matriculas (aluno_id, turma, data_matricula, status) VALUES (?, ?, ?, ?)',
        [aluno_id, turma, data_matricula, status]
      );
      return { id: result.insertId, ...matricula };
    } catch (error) {
      console.error('Erro ao criar matrícula:', error);
      throw error;
    }
  }

  static async update(id, matricula) {
    try {
      const { aluno_id, turma, data_matricula, status } = matricula;
      await pool.execute(
        'UPDATE matriculas SET aluno_id = ?, turma = ?, data_matricula = ?, status = ? WHERE id = ?',
        [aluno_id, turma, data_matricula, status, id]
      );
      return { id, ...matricula };
    } catch (error) {
      console.error(`Erro ao atualizar matrícula com ID ${id}:`, error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      await pool.execute('DELETE FROM matriculas WHERE id = ?', [id]);
      return { id };
    } catch (error) {
      console.error(`Erro ao excluir matrícula com ID ${id}:`, error);
      throw error;
    }
  }
}

module.exports = Matricula;