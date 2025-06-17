const pool = require('../config/db.config');

// Construtor do modelo Usuario
const Usuario = function(usuario) {
  this.nome = usuario.nome;
  this.email = usuario.email;
  this.senha = usuario.senha;
  this.tipo = usuario.tipo;
  this.ativo = usuario.ativo !== undefined ? usuario.ativo : true;
};

// Criar um novo usuário
Usuario.criar = async (novoUsuario) => {
  const query = `INSERT INTO usuarios (nome, email, senha, tipo, ativo) 
                 VALUES (?, ?, ?, ?, ?)`;
  
  const [result] = await pool.execute(query, [
    novoUsuario.nome,
    novoUsuario.email,
    novoUsuario.senha,
    novoUsuario.tipo,
    novoUsuario.ativo
  ]);

  return { id: result.insertId, ...novoUsuario };
};

// Buscar todos os usuários
Usuario.buscarTodos = async () => {
  const [rows] = await pool.execute('SELECT id, nome, email, tipo, ativo, created_at, updated_at FROM usuarios');
  return rows;
};

// Buscar um usuário pelo ID
Usuario.buscarPorId = async (id) => {
  const query = 'SELECT id, nome, email, tipo, ativo, created_at, updated_at FROM usuarios WHERE id = ?';
  const [rows] = await pool.execute(query, [id]);
  
  if (rows.length) {
    return rows[0];
  }
  return null;
};

// Buscar um usuário pelo email
Usuario.buscarPorEmail = async (email) => {
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  const [rows] = await pool.execute(query, [email]);
  
  if (rows.length) {
    return rows[0];
  }
  return null;
};

// Atualizar um usuário pelo ID
Usuario.atualizar = async (id, usuario) => {
  const query = `UPDATE usuarios 
                 SET nome = ?, email = ?, tipo = ?, ativo = ? 
                 WHERE id = ?`;
  
  const [result] = await pool.execute(query, [
    usuario.nome,
    usuario.email,
    usuario.tipo,
    usuario.ativo,
    id
  ]);

  return result.affectedRows > 0;
};

// Atualizar a senha de um usuário
Usuario.atualizarSenha = async (id, novaSenha) => {
  const query = 'UPDATE usuarios SET senha = ? WHERE id = ?';
  const [result] = await pool.execute(query, [novaSenha, id]);
  
  return result.affectedRows > 0;
};

// Excluir um usuário pelo ID
Usuario.excluir = async (id) => {
  // Primeiro exclui o usuário
  const query = 'DELETE FROM usuarios WHERE id = ?';
  const [result] = await pool.execute(query, [id]);
  
  // Se excluiu com sucesso, reseta o auto_increment se for o último ID
  if (result.affectedRows > 0) {
    const [maxResult] = await pool.execute('SELECT MAX(id) as max_id FROM usuarios');
    const maxId = maxResult[0].max_id || 0;
    
    // Reseta o auto_increment para o próximo ID disponível
    await pool.execute(`ALTER TABLE usuarios AUTO_INCREMENT = ${maxId + 1}`);
  }
  
  return result.affectedRows > 0;
};

module.exports = Usuario;