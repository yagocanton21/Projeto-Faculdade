const db = require('../config/db.config');

class Nota {
  static async findAll() {
    const [rows] = await db.query(`
      SELECT n.*, a.nome as aluno_nome, d.nome as disciplina_nome 
      FROM notas n
      JOIN alunos a ON n.aluno_id = a.id
      JOIN disciplinas d ON n.disciplina_id = d.id
    `);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query(`
      SELECT n.*, a.nome as aluno_nome, d.nome as disciplina_nome 
      FROM notas n
      JOIN alunos a ON n.aluno_id = a.id
      JOIN disciplinas d ON n.disciplina_id = d.id
      WHERE n.id = ?
    `, [id]);
    return rows[0];
  }

  static async findByAlunoId(alunoId) {
    const [rows] = await db.query(`
      SELECT n.*, d.nome as disciplina_nome 
      FROM notas n
      JOIN disciplinas d ON n.disciplina_id = d.id
      WHERE n.aluno_id = ?
    `, [alunoId]);
    return rows;
  }

  static async create(nota) {
    const { aluno_id, disciplina_id, valor, data_avaliacao, observacao } = nota;
    const [result] = await db.query(
      'INSERT INTO notas (aluno_id, disciplina_id, valor, data_avaliacao, observacao) VALUES (?, ?, ?, ?, ?)',
      [aluno_id, disciplina_id, valor, data_avaliacao, observacao]
    );
    return { id: result.insertId, ...nota };
  }

  static async update(id, nota) {
    const { aluno_id, disciplina_id, valor, data_avaliacao, observacao } = nota;
    await db.query(
      'UPDATE notas SET aluno_id = ?, disciplina_id = ?, valor = ?, data_avaliacao = ?, observacao = ? WHERE id = ?',
      [aluno_id, disciplina_id, valor, data_avaliacao, observacao, id]
    );
    return { id, ...nota };
  }

  static async delete(id) {
    await db.query('DELETE FROM notas WHERE id = ?', [id]);
    return { id };
  }
}

module.exports = Nota;