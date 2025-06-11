const db = require('../config/db.config');

class Aluno {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM alunos');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM alunos WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(aluno) {
    const { nome, data_nascimento, endereco, telefone } = aluno;
    const [result] = await db.query(
      'INSERT INTO alunos (nome, data_nascimento, endereco, telefone) VALUES (?, ?, ?, ?)',
      [nome, data_nascimento, endereco, telefone]
    );
    return { id: result.insertId, ...aluno };
  }

  static async update(id, aluno) {
    const { nome, data_nascimento, endereco, telefone } = aluno;
    await db.query(
      'UPDATE alunos SET nome = ?, data_nascimento = ?, endereco = ?, telefone = ? WHERE id = ?',
      [nome, data_nascimento, endereco, telefone, id]
    );
    return { id, ...aluno };
  }

  static async delete(id) {
    await db.query('DELETE FROM alunos WHERE id = ?', [id]);
    return { id };
  }
}

module.exports = Aluno;