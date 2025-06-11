const db = require('../config/db.config');

class Turma {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM turmas');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM turmas WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(turma) {
    const { nome, ano_letivo, periodo, capacidade_maxima } = turma;
    const [result] = await db.query(
      'INSERT INTO turmas (nome, ano_letivo, periodo, capacidade_maxima) VALUES (?, ?, ?, ?)',
      [nome, ano_letivo, periodo, capacidade_maxima]
    );
    return { id: result.insertId, ...turma };
  }

  static async update(id, turma) {
    const { nome, ano_letivo, periodo, capacidade_maxima } = turma;
    await db.query(
      'UPDATE turmas SET nome = ?, ano_letivo = ?, periodo = ?, capacidade_maxima = ? WHERE id = ?',
      [nome, ano_letivo, periodo, capacidade_maxima, id]
    );
    return { id, ...turma };
  }

  static async delete(id) {
    await db.query('DELETE FROM turmas WHERE id = ?', [id]);
    return { id };
  }
}

module.exports = Turma;