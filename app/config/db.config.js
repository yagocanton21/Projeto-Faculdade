const mysql = require('mysql2/promise');

// Criar pool de conexões
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'escola_infantil',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Função para tentar conexão com retry
const tryConnection = (retries = 5, delay = 5000) => {
  console.log(`Tentando conectar ao banco de dados... (tentativas restantes: ${retries})`);
  
  return pool.getConnection()
    .then(connection => {
      console.log('Conexão com o banco de dados estabelecida com sucesso!');
      connection.release();
      return true;
    })
    .catch(err => {
      console.error('Erro ao conectar ao banco de dados:', err);
      
      if (retries > 0) {
        console.log(`Tentando novamente em ${delay/1000} segundos...`);
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(tryConnection(retries - 1, delay));
          }, delay);
        });
      }
      
      console.error('Número máximo de tentativas atingido. Não foi possível conectar ao banco de dados.');
      return false;
    });
};

// Iniciar tentativas de conexão
tryConnection();

module.exports = pool;