# Sistema de Gerenciamento Escolar Infantil

## Descrição do Projeto
Este projeto consiste no desenvolvimento da arquitetura e do backend de um Sistema de Gerenciamento Escolar Infantil, conforme solicitação da Escola Infantil UniFAAT-ADS. O sistema implementa rotas de API, controladores e models (modelos de dados/entidades) correspondentes às entidades definidas no Modelo Entidade-Relacionamento (MER), seguindo os padrões REST/RESTFUL com respostas em JSON.

## Objetivos desta Etapa
- Desenvolvimento do backend contendo rotas de API, controladores e models
- Implementação de relacionamentos entre entidades usando JOIN
- Containerização completa do ambiente (aplicação, banco de dados e proxy reverso)
- Criação de uma API RESTful funcional para gerenciamento escolar

## Estrutura do Repositório

### Pasta APP/
Contém todos os arquivos fonte do sistema backend, organizados seguindo a estrutura MVC:

- **app/config/**: Configurações do sistema
  - **db.config.js**: Configuração de conexão com banco de dados MySQL
  
- **app/controllers/**: Controladores que implementam a lógica de negócio
  - **aluno.controller.js**: Controlador para operações CRUD de alunos
  - **matricula.controller.js**: Controlador para operações CRUD de matrículas
  - **nota.controller.js**: Controlador para operações CRUD de notas
  - **professor.controller.js**: Controlador para operações CRUD de professores
  - **presenca.controller.js**: Controlador para operações CRUD de presenças
  
- **app/models/**: Modelos que representam as entidades do sistema
  - **aluno.model.js**: Modelo de dados para alunos
  - **matricula.model.js**: Modelo de dados para matrículas (com JOIN para nome do aluno)
  - **nota.model.js**: Modelo de dados para notas (com JOIN para nome do aluno)
  - **professor.model.js**: Modelo de dados para professores
  - **presenca.model.js**: Modelo de dados para presenças (com JOIN para nome do aluno)
  
- **app/routes/**: Definição das rotas da API REST
  - **aluno.routes.js**: Rotas para operações com alunos
  - **matricula.routes.js**: Rotas para operações com matrículas
  - **nota.routes.js**: Rotas para operações com notas
  - **professor.routes.js**: Rotas para operações com professores
  - **presenca.routes.js**: Rotas para operações com presenças
  
- **app/index.js**: Arquivo principal que inicializa o servidor Express

### Pasta docs/
Contém a documentação técnica do projeto:
- **MER_ATUALIZADO.txt**: Modelo Entidade-Relacionamento do banco de dados
- **DFD_ATUALIZADO.txt**: Diagrama de Fluxo de Dados do sistema

### Arquivos na Raiz
- **init.sql**: Script SQL (DDL) para criação da estrutura das tabelas do banco de dados
- **Dockerfile**: Instruções para construir a imagem Docker do backend
- **Dockerfile.db**: Instruções para construir a imagem Docker do banco de dados MySQL
- **Dockerfile.nginx**: Instruções para construir a imagem Docker do servidor Nginx
- **docker-compose.yml**: Orquestração dos containers (aplicação, banco e nginx)
- **nginx.conf**: Configuração do servidor Nginx para proxy reverso
- **package.json**: Dependências do projeto Node.js

## Estrutura das Rotas de API

O sistema implementa uma API RESTful completa com as seguintes rotas:

### Padrão de URLs
```
http://localhost/api/{entidade}
```

### Entidades Disponíveis
- **alunos**: Gerenciamento de estudantes
- **professores**: Gerenciamento do corpo docente
- **matriculas**: Gerenciamento de vínculos aluno-turma
- **notas**: Gerenciamento de avaliações
- **presencas**: Gerenciamento de frequência

### Operações CRUD Disponíveis
Para cada entidade, as seguintes operações estão disponíveis:
- **GET** `/{entidade}` - Listar todos os registros
- **GET** `/{entidade}/{id}` - Buscar registro por ID
- **POST** `/{entidade}` - Criar novo registro
- **PUT** `/{entidade}/{id}` - Atualizar registro existente
- **DELETE** `/{entidade}/{id}` - Excluir registro

## Como Executar o Backend e Banco de Dados

### Pré-requisitos
- Docker instalado
- Docker Compose instalado

### Instruções de Execução

1. **Clone o repositório**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd [NOME_DA_PASTA]
   ```

2. **Construir e iniciar todos os containers**
   ```bash
   docker-compose up -d --build
   ```
   Este comando irá:
   - Construir a imagem do backend a partir do Dockerfile
   - Construir a imagem do banco MySQL a partir do Dockerfile.db
   - Executar o script init.sql para criar as tabelas
   - Configurar o Nginx como proxy reverso
   - Inicializar todos os containers em background

3. **Verificar se os containers estão rodando**
   ```bash
   docker-compose ps
   ```

4. **Acessar o sistema**
   - API disponível em: http://localhost/api
   - Banco de dados na porta: 3307

### Comandos Úteis

- **Parar os containers**
  ```bash
  docker-compose down
  ```

- **Reiniciar os containers**
  ```bash
  docker-compose restart
  ```

- **Ver logs da aplicação**
  ```bash
  docker logs escola-app
  ```

- **Ver logs do banco de dados**
  ```bash
  docker logs escola-db
  ```

## Guia Completo das APIs - GET, POST, PUT, DELETE

### 1. ALUNOS

#### GET - Listar todos os alunos
```bash
GET http://localhost/api/alunos
```
**Resposta:**
```json
{
  "error": false,
  "message": "5 aluno(s) encontrado(s).",
  "data": [
    {
      "id": 1,
      "nome": "Lucas Pereira",
      "data_nascimento": "2018-03-15T00:00:00.000Z",
      "endereco": "Rua das Flores, 123",
      "telefone": "(11) 91111-1111"
    }
  ]
}
```

#### GET - Buscar aluno por ID
```bash
GET http://localhost/api/alunos/1
```

#### POST - Criar novo aluno
```bash
POST http://localhost/api/alunos
Content-Type: application/json

{
  "nome": "Ana Silva",
  "data_nascimento": "2019-05-20",
  "endereco": "Rua Nova, 456",
  "telefone": "(11) 98888-7777"
}
```

#### PUT - Atualizar aluno
```bash
PUT http://localhost/api/alunos/1
Content-Type: application/json

{
  "nome": "Lucas Pereira Santos",
  "data_nascimento": "2018-03-15",
  "endereco": "Rua das Flores, 123 - Apto 10",
  "telefone": "(11) 91111-1111"
}
```

#### DELETE - Excluir aluno
```bash
DELETE http://localhost/api/alunos/1
```

### 2. PROFESSORES

#### GET - Listar todos os professores
```bash
GET http://localhost/api/professores
```
**Resposta:**
```json
{
  "error": false,
  "message": "30 professor(es) encontrado(s).",
  "data": [
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria.silva@escola.com",
      "telefone": "(11) 98765-4321"
    }
  ]
}
```

#### GET - Buscar professor por ID
```bash
GET http://localhost/api/professores/1
```

#### POST - Criar novo professor
```bash
POST http://localhost/api/professores
Content-Type: application/json

{
  "nome": "Carlos Oliveira",
  "email": "carlos.oliveira@escola.com",
  "telefone": "(11) 95555-4444"
}
```

#### PUT - Atualizar professor
```bash
PUT http://localhost/api/professores/1
Content-Type: application/json

{
  "nome": "Maria Silva Santos",
  "email": "maria.santos@escola.com",
  "telefone": "(11) 98765-4321"
}
```

#### DELETE - Excluir professor
```bash
DELETE http://localhost/api/professores/1
```

### 3. MATRÍCULAS (com JOIN)

#### GET - Listar todas as matrículas
```bash
GET http://localhost/api/matriculas
```
**Resposta (note o campo aluno_nome via JOIN):**
```json
{
  "error": false,
  "message": "5 matrícula(s) encontrada(s).",
  "data": [
    {
      "id": 1,
      "aluno_id": 1,
      "turma": "Turma A",
      "data_matricula": "2023-02-01T00:00:00.000Z",
      "status": "Ativa",
      "aluno_nome": "Lucas Pereira"
    }
  ]
}
```

#### GET - Buscar matrícula por ID
```bash
GET http://localhost/api/matriculas/1
```

#### POST - Criar nova matrícula
```bash
POST http://localhost/api/matriculas
Content-Type: application/json

{
  "aluno_id": 2,
  "turma": "Turma C",
  "data_matricula": "2023-06-15",
  "status": "Ativa"
}
```

#### PUT - Atualizar matrícula
```bash
PUT http://localhost/api/matriculas/1
Content-Type: application/json

{
  "aluno_id": 1,
  "turma": "Turma B",
  "data_matricula": "2023-02-01",
  "status": "Ativa"
}
```

#### DELETE - Excluir matrícula
```bash
DELETE http://localhost/api/matriculas/1
```

### 4. NOTAS (com JOIN)

#### GET - Listar todas as notas
```bash
GET http://localhost/api/notas
```
**Resposta (note o campo aluno_nome via JOIN):**
```json
{
  "error": false,
  "message": "7 nota(s) encontrada(s).",
  "data": [
    {
      "id": 1,
      "aluno_id": 1,
      "disciplina": "Matemática",
      "valor": "8.50",
      "data_avaliacao": "2023-05-15T00:00:00.000Z",
      "observacao": "Boa participação",
      "aluno_nome": "Lucas Pereira"
    }
  ]
}
```

#### GET - Buscar nota por ID
```bash
GET http://localhost/api/notas/1
```

#### POST - Criar nova nota
```bash
POST http://localhost/api/notas
Content-Type: application/json

{
  "aluno_id": 1,
  "disciplina": "Português",
  "valor": 9.0,
  "data_avaliacao": "2023-06-10",
  "observacao": "Excelente redação"
}
```

#### PUT - Atualizar nota
```bash
PUT http://localhost/api/notas/1
Content-Type: application/json

{
  "aluno_id": 1,
  "disciplina": "Matemática",
  "valor": 9.0,
  "data_avaliacao": "2023-05-15",
  "observacao": "Melhorou muito!"
}
```

#### DELETE - Excluir nota
```bash
DELETE http://localhost/api/notas/1
```

### 5. PRESENÇAS (com JOIN)

#### GET - Listar todas as presenças
```bash
GET http://localhost/api/presencas
```
**Resposta (note o campo aluno_nome via JOIN):**
```json
{
  "error": false,
  "message": "8 presença(s) encontrada(s).",
  "data": [
    {
      "id": 1,
      "aluno_id": 1,
      "data_aula": "2023-05-15T00:00:00.000Z",
      "presente": 1,
      "observacao": "Presente",
      "aluno_nome": "Lucas Pereira"
    }
  ]
}
```

#### GET - Buscar presença por ID
```bash
GET http://localhost/api/presencas/1
```

#### POST - Criar nova presença
```bash
POST http://localhost/api/presencas
Content-Type: application/json

{
  "aluno_id": 1,
  "data_aula": "2023-06-15",
  "presente": true,
  "observacao": "Participou ativamente da aula"
}
```

#### PUT - Atualizar presença
```bash
PUT http://localhost/api/presencas/1
Content-Type: application/json

{
  "aluno_id": 1,
  "data_aula": "2023-05-15",
  "presente": false,
  "observacao": "Faltou por motivo médico"
}
```

#### DELETE - Excluir presença
```bash
DELETE http://localhost/api/presencas/1
```

## Funcionalidades Implementadas

### JOIN nas Consultas
O sistema implementa JOIN nas seguintes entidades para enriquecer as respostas:
- **Matrículas**: Retorna o nome do aluno junto com os dados da matrícula
- **Notas**: Retorna o nome do aluno junto com os dados da nota
- **Presenças**: Retorna o nome do aluno junto com os dados de presença

### Dados Iniciais
O sistema já vem populado com dados para demonstração:
- 30 professores cadastrados
- 5 alunos cadastrados
- 5 matrículas ativas
- 7 notas registradas
- 8 registros de presença

## Tecnologias Utilizadas
- **Backend**: Node.js com Express.js
- **Banco de Dados**: MySQL 8.0
- **Containerização**: Docker e Docker Compose
- **Proxy Reverso**: Nginx
- **Padrão de Arquitetura**: MVC (Model-View-Controller)

## Acesso ao Banco de Dados
Para conectar diretamente ao banco MySQL:
- **Host**: localhost
- **Porta**: 3307
- **Usuário**: root
- **Senha**: password
- **Database**: escola_infantil

## Solução de Problemas

### Container não inicia
```bash
# Verificar logs
docker-compose logs

# Reconstruir containers
docker-compose down
docker-compose up -d --build
```

### Erro de conexão com banco
```bash
# Verificar se o banco está rodando
docker-compose ps

# Reiniciar apenas a aplicação
docker-compose restart app
```

### Porta em uso
Se a porta 80 estiver ocupada, edite o `docker-compose.yml` e altere:
```yaml
ports:
  - "8080:80"  # Usar porta 8080 em vez de 80
```

## Estrutura de Resposta da API
Todas as rotas seguem o padrão de resposta JSON:
```json
{
  "error": false,
  "message": "Mensagem descritiva",
  "data": [/* dados da resposta */]
}
```

Em caso de erro:
```json
{
  "error": true,
  "message": "Descrição do erro"
}
```