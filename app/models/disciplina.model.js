const db = require('../config/db.config');

class Disciplina {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM disciplinas');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM disciplinas WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(disciplina) {
    const { nome, descricao, carga_horaria } = disciplina;
    const [result] = await db.query(
      'INSERT INTO disciplinas (nome, descricao, carga_horaria) VALUES (?, ?, ?)',
      [nome, descricao, carga_horaria]
    );
    return { id: result.insertId, ...disciplina };
  }

  static async update(id, disciplina) {
    const { nome, descricao, carga_horaria } = disciplina;
    await db.query(
      'UPDATE disciplinas SET nome = ?, descricao = ?, carga_horaria = ? WHERE id = ?',
      [nome, descricao, carga_horaria, id]
    );
    return { id, ...disciplina };
  }

  static async delete(id) {
    await db.query('DELETE FROM disciplinas WHERE id = ?', [id]);
    return { id };
  }
}

module.exports = Disciplina;