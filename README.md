# Sistema de Gerenciamento Escolar Infantil

## Estrutura do Projeto

### Diagramas
O projeto inclui os seguintes diagramas na pasta # Sistema de Gerenciamento Escolar Infantil

## 📁 Repositório do Projeto
**Para acessar o código completo e fazer download dos arquivos, visite:**
👉 **[https://github.com/yagocanton21/Projeto-Faculdade](https://github.com/yagocanton21/Projeto-Faculdade)**

### Como clonar o repositório usando o VS Code:
1. Abra o VS Code
2. Pressione `Ctrl+Shift+P` para abrir a paleta de comandos
3. Digite "Git: Clone" e selecione esta opção
4. Cole a URL: `https://github.com/yagocanton21/Projeto-Faculdade.git`
5. Escolha uma pasta no seu computador para salvar o projeto

---

## Estrutura do Projeto

### Diagramas
O projeto inclui os seguintes diagramas na pasta `docs/`:
- **Modelo Entidade-Relacionamento (MER)**: `docs/Mer.png` - Representa as entidades do sistema e seus relacionamentos
- **Diagrama de Fluxo de Dados (DFD)**: `docs/DFD.png` - Ilustra o fluxo de dados entre os componentes do sistema

### Estrutura de Diretórios
```
projeto-faculdade/
├── app/                    # Código fonte da aplicação
│   ├── config/             # Configurações da aplicação
│   │   └── db.config.js    # Configuração de conexão com o banco de dados
│   ├── controllers/        # Controladores da API
│   │   ├── aluno.controller.js
│   │   ├── matricula.controller.js
│   │   ├── nota.controller.js
│   │   ├── presenca.controller.js
│   │   └── professor.controller.js
│   ├── models/             # Modelos de dados
│   │   ├── aluno.model.js
│   │   ├── matricula.model.js
│   │   ├── nota.model.js
│   │   ├── presenca.model.js
│   │   └── professor.model.js
│   ├── routes/             # Rotas da API
│   │   ├── aluno.routes.js
│   │   ├── matricula.routes.js
│   │   ├── nota.routes.js
│   │   ├── presenca.routes.js
│   │   └── professor.routes.js
│   └── index.js            # Ponto de entrada da aplicação
├── docs/                   # Documentação
│   ├── DFD.png             # Diagrama de Fluxo de Dados
│   └── Mer.png             # Modelo Entidade-Relacionamento
├── .env                    # Variáveis de ambiente
├── docker-compose.yml      # Configuração do Docker Compose
├── Dockerfile              # Dockerfile para a aplicação Node.js
├── Dockerfile.db           # Dockerfile para o banco de dados MySQL
├── Dockerfile.nginx        # Dockerfile para o servidor Nginx
├── init.sql                # Script SQL para inicialização do banco de dados
├── nginx.conf              # Configuração do Nginx
├── package.json            # Dependências do Node.js
└── README.md               # Este arquivo
```

### Arquivos Docker
- **Dockerfile**: Configura o ambiente Node.js para a aplicação backend
- **Dockerfile.db**: Configura o banco de dados MySQL com o script de inicialização
- **Dockerfile.nginx**: Configura o servidor Nginx como proxy reverso
- **docker-compose.yml**: Orquestra todos os containers (app, db, nginx)

## Requisitos para Execução

1. **Instalar o VS Code**
   - Baixe em: https://code.visualstudio.com/download
   - Instale seguindo as instruções na tela
   - Extensões recomendadas (opcional):
     - Docker: Para gerenciar containers
     - REST Client: Para testar APIs diretamente no VS Code
     - Thunder Client: Alternativa ao Postman dentro do VS Code

2. **Instalar o Docker Desktop**
   - Baixe em: https://www.docker.com/products/docker-desktop
   - Instale seguindo as instruções na tela (Próximo, Próximo, Concluir)
   - Reinicie o computador após a instalação
   - Abra o Docker Desktop e aguarde até que o ícone da baleia fique estável (sem animação)

## Instruções de Execução

### PASSO 1: Baixar os arquivos
- Baixe todos os arquivos deste projeto para seu computador
- Descompacte em uma pasta de fácil acesso (exemplo: C:\Projeto ou Desktop)

### PASSO 2: Abrir o projeto no VS Code
- Abra o VS Code
- Clique em "File" > "Open Folder" (ou pressione Ctrl+K Ctrl+O)
- Navegue até a pasta do projeto e clique em "Selecionar pasta"

### PASSO 3: Iniciar a aplicação pelo terminal do VS Code
- No VS Code, abra o terminal clicando em "Terminal" > "New Terminal" (ou pressione Ctrl+`)
- No terminal que aparece na parte inferior, digite o comando:
  ```
  docker-compose up -d --build
  ```
- Aguarde alguns minutos até que tudo seja instalado e iniciado

### Verificação da Instalação
1. Abra seu navegador (Chrome, Firefox, Edge, etc.)
2. Digite na barra de endereço: http://localhost/api
3. Você deve ver uma mensagem como esta:
   ```
   {"message":"API do Sistema de Gerenciamento Escolar Infantil","status":"online"}
   ```

## Arquitetura do Sistema

### Backend (Node.js + Express)
- Implementa uma API RESTful seguindo o padrão MVC
- Utiliza Express.js para gerenciamento de rotas
- Conexão com MySQL usando bibliotecas nativas

### Banco de Dados (MySQL)
- Armazena dados de alunos, professores, matrículas, notas e presenças
- Implementa relacionamentos conforme definido no MER
- Inicializado com dados de exemplo para demonstração

### Proxy Reverso (Nginx)
- Gerencia requisições HTTP
- Encaminha solicitações para o serviço Node.js
- Melhora a segurança e o desempenho da aplicação

## Documentação da API

### Endpoints Disponíveis

#### Alunos
- `GET /api/alunos` - Lista todos os alunos
- `GET /api/alunos/:id` - Busca um aluno pelo ID
- `POST /api/alunos` - Cria um novo aluno
- `PUT /api/alunos/:id` - Atualiza um aluno existente
- `DELETE /api/alunos/:id` - Remove um aluno

#### Professores
- `GET /api/professores` - Lista todos os professores
- `GET /api/professores/:id` - Busca um professor pelo ID
- `POST /api/professores` - Cria um novo professor
- `PUT /api/professores/:id` - Atualiza um professor existente
- `DELETE /api/professores/:id` - Remove um professor

#### Matrículas
- `GET /api/matriculas` - Lista todas as matrículas (com JOIN para nome do aluno)
- `GET /api/matriculas/:id` - Busca uma matrícula pelo ID
- `POST /api/matriculas` - Cria uma nova matrícula
- `PUT /api/matriculas/:id` - Atualiza uma matrícula existente
- `DELETE /api/matriculas/:id` - Remove uma matrícula

#### Notas
- `GET /api/notas` - Lista todas as notas (com JOIN para nome do aluno)
- `GET /api/notas/:id` - Busca uma nota pelo ID
- `POST /api/notas` - Cria uma nova nota
- `PUT /api/notas/:id` - Atualiza uma nota existente
- `DELETE /api/notas/:id` - Remove uma nota

#### Presenças
- `GET /api/presencas` - Lista todas as presenças (com JOIN para nome do aluno)
- `GET /api/presencas/:id` - Busca uma presença pelo ID
- `POST /api/presencas` - Cria uma nova presença
- `PUT /api/presencas/:id` - Atualiza uma presença existente
- `DELETE /api/presencas/:id` - Remove uma presença

### Exemplos de Uso

#### Exemplo: Criar um novo aluno
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

#### Exemplo: Atualizar um professor
```bash
PUT http://localhost/api/professores/1
Content-Type: application/json

{
  "nome": "Maria Silva Santos",
  "email": "maria.santos@escola.com",
  "telefone": "(11) 98765-4321"
}
```

## Banco de Dados

### Estrutura do Banco de Dados
O banco de dados `escola_infantil` contém as seguintes tabelas:

1. **alunos**
   - id (PK)
   - nome
   - data_nascimento
   - endereco
   - telefone
   - created_at
   - updated_at

2. **professores**
   - id (PK)
   - nome
   - email
   - telefone

3. **matriculas**
   - id (PK)
   - aluno_id (FK -> alunos.id)
   - turma
   - data_matricula
   - status
   - created_at
   - updated_at

4. **notas**
   - id (PK)
   - aluno_id (FK -> alunos.id)
   - disciplina
   - valor
   - data_avaliacao
   - observacao
   - created_at
   - updated_at

5. **presencas**
   - id (PK)
   - aluno_id (FK -> alunos.id)
   - data_aula
   - presente
   - observacao
   - created_at
   - updated_at

### Acesso ao Banco de Dados
Para conectar diretamente ao banco MySQL:
- **Host**: localhost
- **Porta**: 3307
- **Usuário**: root
- **Senha**: password
- **Database**: escola_infantil

## Gerenciamento de Containers Docker

### Containers Utilizados
- **escola-app**: Aplicação Node.js/Express
- **escola-db**: Banco de dados MySQL
- **escola-nginx**: Servidor web Nginx

### Comandos Úteis

#### Verificar status dos containers
```bash
docker-compose ps
```

#### Ver logs dos containers
```bash
docker logs escola-app
docker logs escola-db
docker logs escola-nginx
```

#### Reiniciar containers
```bash
docker-compose restart
```

#### Parar e remover containers
```bash
docker-compose down
```

#### Reconstruir e iniciar containers
```bash
docker-compose up -d --build
```

## Solução de Problemas

### O sistema não abre no navegador
1. Verifique se digitou o endereço corretamente: http://localhost/api
2. Verifique se o Docker Desktop está aberto e rodando
3. Verifique se os containers estão rodando: `docker-compose ps`
4. Se não estiverem rodando, tente reiniciar: `docker-compose down && docker-compose up -d --build`
5. Veja os logs para identificar erros: `docker-compose logs`

### Mensagem de erro "porta em uso"
1. Feche outros programas que possam estar usando a porta 80
2. Ou mude a porta no arquivo docker-compose.yml de "80:80" para "8080:80" e acesse http://localhost:8080/api

### Erro de conexão com o banco de dados
1. Verifique se o container do banco de dados está rodando: `docker ps | findstr escola-db`
2. Se não estiver, reinicie todos os containers
3. Aguarde pelo menos 30 segundos para o banco de dados inicializar completamente

## Dicas para Apresentação do Projeto

### Roteiro de Demonstração
1. **Introdução ao Sistema**
   - Explique o propósito do sistema (gerenciamento escolar infantil)
   - Apresente a arquitetura geral (Node.js, MySQL, Docker, Nginx)

2. **Demonstração da API**
   - Mostre a API funcionando no navegador (http://localhost/api)
   - Use o Thunder Client para demonstrar as operações CRUD:
     - Listar alunos (GET)
     - Criar um novo aluno (POST)
     - Buscar um aluno específico (GET com ID)
     - Atualizar um aluno (PUT)
     - Excluir um aluno (DELETE)

3. **Explicação do Código**
   - Mostre a estrutura MVC do projeto
   - Explique como os controllers se comunicam com os models
   - Destaque o uso de async/await para operações assíncronas

4. **Demonstração do Docker**
   - Explique como os containers se comunicam
   - Mostre os comandos para gerenciar os containers

## Tecnologias Utilizadas
- **Backend**: Node.js v16.20.2 com Express.js
- **Banco de Dados**: MySQL 8.0.42
- **Containerização**: Docker e Docker Compose
- **Proxy Reverso**: Nginx 1.29.0
- **Padrão de Arquitetura**: MVC (Model-View-Controller)

## Testando com Thunder Client

Para testar a API usando o Thunder Client no VS Code:

1. Instale a extensão Thunder Client no VS Code
2. Clique no ícone do raio na barra lateral
3. Clique em "New Request"
4. Configure a requisição conforme os exemplos abaixo

### Exemplo: Listar todos os alunos
- Método: **GET**
- URL: `http://localhost/api/alunos`
- Clique em "Send"

### Exemplo: Criar um novo aluno
- Método: **POST**
- URL: `http://localhost/api/alunos`
- Vá para a aba "Body"
- Selecione "JSON"
- Cole o conteúdo do exemplo acima
- Clique em "Send"