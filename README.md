# Sistema de Gerenciamento Escolar Infantil

## Descrição do Projeto
Este projeto consiste em um sistema de gerenciamento escolar infantil, desenvolvido como backend com API RESTful. O sistema permite gerenciar alunos, professores, turmas, disciplinas, notas, responsáveis e usuários do sistema.

## Estrutura de Pastas
- **app/**: Contém todos os arquivos fonte do sistema backend
  - **config/**: Configurações do sistema, incluindo conexão com banco de dados
  - **controllers/**: Controladores que implementam a lógica de negócio
  - **models/**: Modelos que representam as entidades do sistema
  - **routes/**: Definição das rotas da API
  - **middlewares/**: Middlewares para processamento de requisições
  - **index.js**: Arquivo principal que inicializa o servidor
- **docs/**: Documentação técnica do projeto
  - **MER.txt**: Modelo Entidade-Relacionamento do banco de dados
  - **DFD.txt**: Diagrama de Fluxo de Dados do sistema
- **sql/**: Scripts SQL para criação e inicialização do banco de dados
  - **init.sql**: Script para criação das tabelas principais
  - **usuario.sql**: Script para criação da tabela de usuários
- **Dockerfile**: Instruções para construir a imagem Docker do backend
- **Dockerfile.db**: Instruções para construir a imagem Docker do banco de dados
- **Dockerfile.nginx**: Instruções para construir a imagem Docker do servidor Nginx
- **nginx.conf**: Configuração do servidor Nginx para proxy reverso
- **docker-compose.yml**: Configuração para orquestração dos containers
- **.env**: Variáveis de ambiente para configuração do sistema

## Como Executar o Projeto

### Pré-requisitos
- Docker
- Docker Compose

### Passos para Execução
1. Clone o repositório
2. Navegue até a pasta do projeto
3. Construa e inicie os containers:
   ```
   docker-compose up -d --build
   ```
4. Para parar os containers:
   ```
   docker-compose down
   ```
5. Para reiniciar os containers:
   ```
   docker-compose restart
   ```
6. O sistema estará disponível em:
   - API: http://localhost/api
   - Ou diretamente: http://localhost:8080 (porta exposta pelo container da aplicação)

### Interagindo com a API

#### Usuários
- **Listar todos os usuários**: GET http://localhost/api/usuarios
- **Buscar usuário por ID**: GET http://localhost/api/usuarios/{id}
- **Criar usuário**: POST http://localhost/api/usuarios
  ```json
  {
    "nome": "Nome do Usuário",
    "email": "usuario@exemplo.com",
    "senha": "123456",
    "tipo": "Administrador"  // Valores aceitos: "Administrador", "Professor", "Aluno"
  }
  ```
- **Atualizar usuário**: PUT http://localhost/api/usuarios/{id}
  ```json
  {
    "nome": "Nome Atualizado",
    "email": "email@atualizado.com",
    "tipo": "Professor"
  }
  ```
- **Atualizar senha**: PATCH http://localhost/api/usuarios/{id}/senha
  ```json
  {
    "senha": "novaSenha123"
  }
  ```
- **Excluir usuário**: DELETE http://localhost/api/usuarios/{id}

#### Alunos
- **Listar todos os alunos**: GET http://localhost/api/alunos
- **Buscar aluno por ID**: GET http://localhost/api/alunos/{id}
- **Criar aluno**: POST http://localhost/api/alunos
  ```json
  {
    "nome": "Nome do Aluno",
    "data_nascimento": "2018-01-15",
    "endereco": "Rua Exemplo, 123",
    "telefone": "(11) 98765-4321"
  }
  ```
- **Atualizar aluno**: PUT http://localhost/api/alunos/{id}
- **Excluir aluno**: DELETE http://localhost/api/alunos/{id}

#### Professores
- **Listar todos os professores**: GET http://localhost/api/professores
- **Buscar professor por ID**: GET http://localhost/api/professores/{id}
- **Criar professor**: POST http://localhost/api/professores
- **Atualizar professor**: PUT http://localhost/api/professores/{id}
- **Excluir professor**: DELETE http://localhost/api/professores/{id}

#### Turmas
- **Listar todas as turmas**: GET http://localhost/api/turmas
- **Buscar turma por ID**: GET http://localhost/api/turmas/{id}
- **Criar turma**: POST http://localhost/api/turmas
- **Atualizar turma**: PUT http://localhost/api/turmas/{id}
- **Excluir turma**: DELETE http://localhost/api/turmas/{id}

## Tecnologias Utilizadas
- Node.js
- Express.js
- MySQL
- Docker
- Nginx

## Solução de Problemas

### Erro ao acessar a API
- Verifique se todos os containers estão rodando: `docker-compose ps`
- Verifique os logs da aplicação: `docker logs escola-app`
- Verifique os logs do nginx: `docker logs escola-nginx`
- Verifique os logs do banco de dados: `docker logs escola-db`

### Erro de conexão com o banco de dados
- Verifique se o container do banco de dados está rodando
- Verifique se as variáveis de ambiente estão configuradas corretamente no arquivo .env
- Tente reiniciar o container da aplicação: `docker-compose restart app`

### Portas em uso
- Se alguma porta já estiver em uso, modifique o arquivo docker-compose.yml para usar portas diferentes

## Autores
- Equipe de Desenvolvimento