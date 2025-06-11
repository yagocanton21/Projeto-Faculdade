const db = require('../config/db.config');

class Matricula {
  static async findAll() {
    const [rows] = await db.query(`
      SELECT m.*, a.nome as aluno_nome, t.nome as turma_nome 
      FROM matriculas m
      JOIN alunos a ON m.aluno_id = a.id
      JOIN turmas t ON m.turma_id = t.id
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query(`
      SELECT m.*, a.nome as aluno_nome, t.nome as turma_nome 
      FROM matriculas m
      JOIN alunos a ON m.aluno_id = a.id
      JOIN turmas t ON m.turma_id = t.id
      WHERE m.id = ?
    `, [id]);
    return rows[0];
  }

  static async create(matricula) {
    const { aluno_id, turma_id, data_matricula, status } = matricula;
    const [result] = await db.query(
      'INSERT INTO matriculas (aluno_id, turma_id, data_matricula, status) VALUES (?, ?, ?, ?)',
      [aluno_id, turma_id, data_matricula, status]
    );
    return { id: result.insertId, ...matricula };
  }

  static async update(id, matricula) {
    const { aluno_id, turma_id, data_matricula, status } = matricula;
    await db.query(
      'UPDATE matriculas SET aluno_id = ?, turma_id = ?, data_matricula = ?, status = ? WHERE id = ?',
      [aluno_id, turma_id, data_matricula, status, id]
    );
    return { id, ...matricula };
  }

  static async delete(id) {
    await db.query('DELETE FROM matriculas WHERE id = ?', [id]);
    return { id };
  }
}

module.exports = Matricula;