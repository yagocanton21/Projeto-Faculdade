# Sistema de Gerenciamento Escolar Infantil - UniFAAT-ADS

## Descrição Geral
Este projeto implementa o backend de um Sistema de Gerenciamento Escolar Infantil para a Escola Infantil UniFAAT-ADS. O sistema fornece uma API RESTful que permite gerenciar alunos, professores, turmas, disciplinas, notas e outras entidades relacionadas ao ambiente escolar.

## Estrutura de Pastas

```
Projeto-backend/
├── app/                    # Código fonte do backend
│   ├── controllers/        # Controladores da API
│   ├── models/             # Modelos de dados/entidades
│   ├── routes/             # Rotas da API
│   ├── config/             # Configurações do sistema
│   ├── middlewares/        # Middlewares da aplicação
│   └── index.js            # Ponto de entrada da aplicação
├── docs/                   # Documentação técnica
│   ├── MER.pdf             # Modelo Entidade-Relacionamento
│   └── DFD.pdf             # Diagrama de Fluxo de Dados
├── sql/                    # Scripts SQL
│   └── init.sql            # Script de criação das tabelas
├── Dockerfile              # Dockerfile para o backend
├── Dockerfile.db           # Dockerfile para o banco de dados
├── docker-compose.yml      # Configuração do Docker Compose
├── .env                    # Variáveis de ambiente
├── package.json            # Dependências do projeto
└── README.md               # Este arquivo
```

## Como Executar o Projeto

### Pré-requisitos
- Docker e Docker Compose instalados

### Passos para Execução

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd Projeto-backend
```

2. Inicie os containers com Docker Compose:
```bash
docker-compose up -d
```

Este comando irá:
- Construir a imagem do backend
- Construir a imagem do banco de dados
- Iniciar todos os serviços

3. Acesse a API através do endereço:
```
http://localhost:8080/alunos
http://localhost:8080/professores
http://localhost:8080/turmas
```

### Solução de Problemas

Se você encontrar o erro "Ports are not available" para a porta 3306, isso significa que você já tem um servidor MySQL ou outro serviço usando essa porta. O docker-compose.yml foi configurado para usar a porta 3307 externamente, mapeando para a porta 3306 dentro do container.

Se você encontrar o erro "Ports are not available" para a porta 8080, você pode modificar o arquivo docker-compose.yml e alterar a porta para outra disponível, por exemplo:
```yaml
ports:
  - "9000:3000"
```

E então acessar a API em http://localhost:9000/alunos

Para conectar-se ao banco de dados MySQL a partir da sua máquina local:
```
Host: localhost
Porta: 3307
Usuário: root
Senha: password
Banco de dados: escola_infantil
```

## Rotas da API

### Alunos
- `GET /alunos` - Lista todos os alunos
- `GET /alunos/:id` - Obtém detalhes de um aluno específico
- `POST /alunos` - Cadastra um novo aluno
- `PUT /alunos/:id` - Atualiza dados de um aluno
- `DELETE /alunos/:id` - Remove um aluno

### Professores
- `GET /professores` - Lista todos os professores
- `GET /professores/:id` - Obtém detalhes de um professor específico
- `POST /professores` - Cadastra um novo professor
- `PUT /professores/:id` - Atualiza dados de um professor
- `DELETE /professores/:id` - Remove um professor

### Turmas
- `GET /turmas` - Lista todas as turmas
- `GET /turmas/:id` - Obtém detalhes de uma turma específica
- `POST /turmas` - Cadastra uma nova turma
- `PUT /turmas/:id` - Atualiza dados de uma turma
- `DELETE /turmas/:id` - Remove uma turma

### Disciplinas
- `GET /disciplinas` - Lista todas as disciplinas
- `GET /disciplinas/:id` - Obtém detalhes de uma disciplina específica
- `POST /disciplinas` - Cadastra uma nova disciplina
- `PUT /disciplinas/:id` - Atualiza dados de uma disciplina
- `DELETE /disciplinas/:id` - Remove uma disciplina

### Notas
- `GET /notas` - Lista todas as notas
- `GET /notas/aluno/:id` - Obtém notas de um aluno específico
- `POST /notas` - Cadastra uma nova nota
- `PUT /notas/:id` - Atualiza uma nota
- `DELETE /notas/:id` - Remove uma nota