# 🏫 Sistema de Gerenciamento Escolar Infantil

Sistema completo de gerenciamento escolar com frontend React + TypeScript, backend Node.js, e comunicação em tempo real via WebSocket.

---

## 📋 Sobre o Projeto

Sistema desenvolvido para gerenciar alunos e professores de uma escola infantil, com interface moderna e atualizações em tempo real.

### Tecnologias Utilizadas

**Frontend:**
- React 18 + TypeScript
- Vite (build tool)
- Axios (HTTP client)
- WebSocket (tempo real)

**Backend:**
- Node.js + Express
- MySQL 8.0
- WebSocket Server
- Docker + Docker Compose

---

## 🚀 Como Executar

### Opção 1: Docker (Recomendado)

```bash
# 1. Clone o repositório
git clone https://github.com/yagocanton21/Projeto-Faculdade.git
cd Projeto-Faculdade

# 2. Inicie os containers
docker-compose up -d --build

# 3. Acesse a aplicação
# Frontend: http://localhost
# API: http://localhost/api
```

## 🎯 Funcionalidades

### ✅ CRUD Completo
- **Alunos**: Cadastro, listagem, edição e exclusão
- **Professores**: Cadastro, listagem, edição e exclusão

### ⚡ Tempo Real
- WebSocket para notificações instantâneas
- Atualização automática das listas
- Custom hook React para gerenciar conexões

### 🎨 Interface Moderna
- Dashboard administrativo com estatísticas
- Design responsivo e profissional
- Feedback visual de ações

---

## 📁 Estrutura do Projeto

```
Projeto-Faculdade/
├── app/                      # Backend
│   ├── controllers/          # Lógica de negócio
│   ├── models/              # Modelos de dados
│   ├── routes/              # Rotas da API
│   ├── views/               # Views EJS
│   └── index.js             # Servidor principal
├── frontend/                 # Frontend React
│   ├── src/
│   │   ├── components/      # Componentes React
│   │   ├── pages/           # Páginas (Home, Alunos, Professores)
│   │   ├── hooks/           # Custom hooks (useWebSocket)
│   │   ├── services/        # API client
│   │   └── types/           # TypeScript types
│   └── package.json
├── docker-compose.yml        # Orquestração Docker
└── README.md
```

---

## 🔌 API REST

### Alunos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/alunos` | Lista todos os alunos |
| GET | `/api/alunos/:id` | Busca um aluno |
| POST | `/api/alunos` | Cria novo aluno |
| PUT | `/api/alunos/:id` | Atualiza aluno |
| DELETE | `/api/alunos/:id` | Remove aluno |

### Professores

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/professores` | Lista todos os professores |
| GET | `/api/professores/:id` | Busca um professor |
| POST | `/api/professores` | Cria novo professor |
| PUT | `/api/professores/:id` | Atualiza professor |
| DELETE | `/api/professores/:id` | Remove professor |

**Exemplo de requisição:**
```bash
curl -X POST http://localhost/api/alunos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "data_nascimento": "2019-06-10",
    "endereco": "Av. Central, 456",
    "telefone": "(11) 98765-4321"
  }'
```

---

## 🔌 WebSocket

### Como Funciona

1. Cliente conecta ao WebSocket (`ws://localhost/api/`)
2. Servidor envia notificações quando há mudanças (CRUD)
3. Frontend atualiza automaticamente as listas

### Eventos Enviados

- `aluno:created` - Novo aluno cadastrado
- `aluno:updated` - Aluno atualizado
- `aluno:deleted` - Aluno removido
- `professor:created` - Novo professor cadastrado
- `professor:updated` - Professor atualizado
- `professor:deleted` - Professor removido

### Custom Hook

```typescript
// Uso do hook
const { isConnected, lastMessage, sendMessage } = useWebSocket();

// Características:
// - Reconexão automática (até 5 tentativas)
// - Gerenciamento de estado
// - Cleanup automático
```

---

## 🔨 Build do Frontend

```bash
cd frontend
npm run build
```

Gera arquivos otimizados em `frontend/dist/`:
- HTML minificado
- JavaScript bundled e minificado
- CSS otimizado

---

## 🐳 Docker

### Containers

- **escola-db**: MySQL 8.0 (porta 3307)
- **escola-app**: Backend Node.js (porta 3000)
- **escola-nginx**: Frontend + Proxy reverso (porta 80)

### Comandos Úteis

```bash
# Ver logs
docker logs escola-app
docker logs escola-nginx

# Parar containers
docker-compose down

# Rebuild
docker-compose up -d --build
```

---

## 📊 Views EJS

Além do frontend React, o projeto inclui views server-side com EJS:

- `/views/alunos` - Lista de alunos renderizada no servidor
- `/views/professores` - Lista de professores renderizada no servidor

---

## ✅ Requisitos Atendidos

- [x] Views CRUD funcionando + backend no Docker (3 pontos)
- [x] Pré-compilador Vite funcionando (2 pontos)
- [x] TypeScript no front-end (1 ponto)
- [x] React + TypeScript (1 ponto)
- [x] Views EJS (1 ponto)
- [x] WebSocket + custom hook (2 pontos)

**Total: 10/10 pontos**

---

## 👨‍💻 Desenvolvedor

**Yago Canton** 
**Marcello Esteves**
**Gustavo Fernandes** 
Projeto Acadêmico - Sistema de Gerenciamento Escolar  
2025

---

## 📝 Licença

Este projeto é acadêmico e está disponível para fins educacionais.
