const db = require('../config/db.config');

class Responsavel {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM responsaveis');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM responsaveis WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(responsavel) {
    const { nome, cpf, telefone, email, parentesco } = responsavel;
    const [result] = await db.query(
      'INSERT INTO responsaveis (nome, cpf, telefone, email, parentesco) VALUES (?, ?, ?, ?, ?)',
      [nome, cpf, telefone, email, parentesco]
    );
    return { id: result.insertId, ...responsavel };
  }

  static async update(id, responsavel) {
    const { nome, cpf, telefone, email, parentesco } = responsavel;
    await db.query(
      'UPDATE responsaveis SET nome = ?, cpf = ?, telefone = ?, email = ?, parentesco = ? WHERE id = ?',
      [nome, cpf, telefone, email, parentesco, id]
    );
    return { id, ...responsavel };
  }

  static async delete(id) {
    await db.query('DELETE FROM responsaveis WHERE id = ?', [id]);
    return { id };
  }
}

module.exports = Responsavel;