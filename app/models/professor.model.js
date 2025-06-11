const db = require('../config/db.config');

class Professor {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM professores');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM professores WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(professor) {
    const { nome, email, telefone, formacao, data_contratacao } = professor;
    const [result] = await db.query(
      'INSERT INTO professores (nome, email, telefone, formacao, data_contratacao) VALUES (?, ?, ?, ?, ?)',
      [nome, email, telefone, formacao, data_contratacao]
    );
    return { id: result.insertId, ...professor };
  }

  static async update(id, professor) {
    const { nome, email, telefone, formacao, data_contratacao } = professor;
    await db.query(
      'UPDATE professores SET nome = ?, email = ?, telefone = ?, formacao = ?, data_contratacao = ? WHERE id = ?',
      [nome, email, telefone, formacao, data_contratacao, id]
    );
    return { id, ...professor };
  }

  static async delete(id) {
    await db.query('DELETE FROM professores WHERE id = ?', [id]);
    return { id };
  }
}

module.exports = Professor;