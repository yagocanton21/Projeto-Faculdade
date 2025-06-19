# Sistema de Gerenciamento Escolar Infantil

## Descrição do Projeto
Este projeto consiste em um sistema de gerenciamento escolar infantil, desenvolvido como backend com API RESTful. O sistema permite gerenciar alunos, matrículas, notas, professores e presenças com relacionamentos entre as entidades usando JOIN.

## Estrutura de Pastas
- **app/**: Contém todos os arquivos fonte do sistema backend
  - **config/**: Configurações do sistema, incluindo conexão com banco de dados
  - **controllers/**: Controladores que implementam a lógica de negócio
    - **aluno.controller.js**: Controlador para gerenciamento de alunos
    - **matricula.controller.js**: Controlador para gerenciamento de matrículas
    - **nota.controller.js**: Controlador para gerenciamento de notas
    - **professor.controller.js**: Controlador para gerenciamento de professores
    - **presenca.controller.js**: Controlador para gerenciamento de presenças
  - **models/**: Modelos que representam as entidades do sistema (com JOIN implementado)
    - **aluno.model.js**: Modelo de dados para alunos
    - **matricula.model.js**: Modelo de dados para matrículas (com nome do aluno)
    - **nota.model.js**: Modelo de dados para notas (com nome do aluno)
    - **professor.model.js**: Modelo de dados para professores
    - **presenca.model.js**: Modelo de dados para presenças (com nome do aluno)
  - **routes/**: Definição das rotas da API
    - **aluno.routes.js**: Rotas para operações com alunos
    - **matricula.routes.js**: Rotas para operações com matrículas
    - **nota.routes.js**: Rotas para operações com notas
    - **professor.routes.js**: Rotas para operações com professores
    - **presenca.routes.js**: Rotas para operações com presenças
  - **index.js**: Arquivo principal que inicializa o servidor
- **docs/**: Documentação técnica do projeto
  - **MER.png**: Modelo Entidade-Relacionamento do banco de dados
  - **DFD.drawio**: Diagrama de Fluxo de Dados do sistema
- **init.sql**: Script para criação das tabelas e dados iniciais do banco de dados
- **Dockerfile**: Instruções para construir a imagem Docker do backend
- **Dockerfile.db**: Instruções para construir a imagem Docker do banco de dados
- **Dockerfile.nginx**: Instruções para construir a imagem Docker do servidor Nginx
- **nginx.conf**: Configuração do servidor Nginx para proxy reverso
- **docker-compose.yml**: Configuração para orquestração dos containers
- **.env**: Variáveis de ambiente para configuração do sistema

## Funcionalidades Especiais

### JOIN Implementado
O sistema utiliza JOIN nas consultas para retornar dados relacionados:
- **Matrículas**: Retorna o nome do aluno junto com os dados da matrícula
- **Notas**: Retorna o nome do aluno junto com os dados da nota
- **Presenças**: Retorna o nome do aluno junto com os dados de presença

### Dados Iniciais
O sistema já vem com dados pré-cadastrados:
- **30 professores**
- **5 alunos**
- **5 matrículas**
- **7 notas**
- **8 presenças**

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

### Interagindo com a API

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
  ```json
  {
    "nome": "Nome do Professor",
    "email": "professor@exemplo.com",
    "telefone": "(11) 91234-5678"
  }
  ```
- **Atualizar professor**: PUT http://localhost/api/professores/{id}
- **Excluir professor**: DELETE http://localhost/api/professores/{id}

#### Matrículas (com JOIN)
- **Listar todas as matrículas**: GET http://localhost/api/matriculas
  ```json
  // Resposta inclui aluno_nome
  {
    "data": [
      {
        "id": 1,
        "aluno_id": 1,
        "turma": "Turma A",
        "aluno_nome": "Lucas Pereira"
      }
    ]
  }
  ```
- **Buscar matrícula por ID**: GET http://localhost/api/matriculas/{id}
- **Criar matrícula**: POST http://localhost/api/matriculas
  ```json
  {
    "aluno_id": 1,
    "turma": "Turma A",
    "data_matricula": "2023-02-01",
    "status": "Ativa"
  }
  ```
- **Atualizar matrícula**: PUT http://localhost/api/matriculas/{id}
- **Excluir matrícula**: DELETE http://localhost/api/matriculas/{id}

#### Notas (com JOIN)
- **Listar todas as notas**: GET http://localhost/api/notas
  ```json
  // Resposta inclui aluno_nome
  {
    "data": [
      {
        "id": 1,
        "aluno_id": 1,
        "disciplina": "Matemática",
        "valor": 8.5,
        "aluno_nome": "Lucas Pereira"
      }
    ]
  }
  ```
- **Buscar nota por ID**: GET http://localhost/api/notas/{id}
- **Criar nota**: POST http://localhost/api/notas
  ```json
  {
    "aluno_id": 1,
    "disciplina": "Matemática",
    "valor": 8.5,
    "data_avaliacao": "2023-05-15",
    "observacao": "Prova bimestral"
  }
  ```
- **Atualizar nota**: PUT http://localhost/api/notas/{id}
- **Excluir nota**: DELETE http://localhost/api/notas/{id}

#### Presenças (com JOIN)
- **Listar todas as presenças**: GET http://localhost/api/presencas
  ```json
  // Resposta inclui aluno_nome
  {
    "data": [
      {
        "id": 1,
        "aluno_id": 1,
        "data_aula": "2023-05-15",
        "presente": true,
        "aluno_nome": "Lucas Pereira"
      }
    ]
  }
  ```
- **Buscar presença por ID**: GET http://localhost/api/presencas/{id}
- **Criar presença**: POST http://localhost/api/presencas
  ```json
  {
    "aluno_id": 1,
    "data_aula": "2023-05-15",
    "presente": true,
    "observacao": "Presente na aula"
  }
  ```
- **Atualizar presença**: PUT http://localhost/api/presencas/{id}
- **Excluir presença**: DELETE http://localhost/api/presencas/{id}

## Tecnologias Utilizadas
- Node.js
- Express.js
- MySQL (com JOIN)
- Docker
- Nginx

## Acesso ao Banco de Dados
Para conectar ao MySQL usando o MySQL Workbench:
- **Hostname**: 127.0.0.1 (ou localhost)
- **Porta**: 3307
- **Usuário**: root
- **Senha**: password

## Testando com Thunder Client
1. Instale a extensão Thunder Client no VS Code
2. Crie uma nova requisição
3. Configure:
   - **Method**: GET
   - **URL**: http://localhost/api/matriculas
4. Observe o campo `aluno_nome` na resposta (JOIN funcionando)

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