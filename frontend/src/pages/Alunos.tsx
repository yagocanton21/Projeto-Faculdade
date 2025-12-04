import { useEffect, useState } from 'react';
import { alunoService } from '../services/api';
import { Aluno, WebSocketMessage } from '../types';
import { useWebSocket } from '../hooks/useWebSocket';

export default function Alunos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [form, setForm] = useState<Aluno>({ nome: '', data_nascimento: '', endereco: '', telefone: '' });
  const [editId, setEditId] = useState<number | null>(null);
  const { sendMessage, lastMessage } = useWebSocket();

  useEffect(() => {
    loadAlunos();
  }, []);

  // Reagir às mensagens do WebSocket
  useEffect(() => {
    if (lastMessage && lastMessage.type && lastMessage.type.startsWith('aluno:')) {
      console.log('Notificação WebSocket recebida:', lastMessage);
      loadAlunos(); // Recarrega a lista quando recebe notificação
    }
  }, [lastMessage]);

  const loadAlunos = async () => {
    try {
      const response: any = await alunoService.getAll();
      setAlunos(response.data.data || []);
    } catch (error) {
      console.error('Erro ao carregar alunos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await alunoService.update(editId, form);
        sendMessage?.({ type: 'entity_update', data: { entity: 'aluno', action: 'updated', id: editId } } as WebSocketMessage);
      } else {
        const res: any = await alunoService.create(form);
        const createdId = res?.data?.data?.id ?? res?.data?.id ?? null;
        sendMessage?.({ type: 'entity_update', data: { entity: 'aluno', action: 'created', id: createdId } } as WebSocketMessage);
      }
      setForm({ nome: '', data_nascimento: '', endereco: '', telefone: '' });
      setEditId(null);
      loadAlunos();
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
    }
  };

  const handleEdit = (aluno: Aluno) => {
    setForm(aluno);
    setEditId(aluno.id!);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Deseja excluir este aluno?')) {
      try {
        await alunoService.delete(id);
        sendMessage?.({ type: 'entity_update', data: { entity: 'aluno', action: 'deleted', id } } as WebSocketMessage);
        loadAlunos();
      } catch (error) {
        console.error('Erro ao excluir aluno:', error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Gerenciar Alunos</h1>
      
      <form onSubmit={handleSubmit} className="card" style={{ marginBottom: '20px' }}>
        <h2>{editId ? 'Editar' : 'Novo'} Aluno</h2>
        <input
          type="text"
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          required
          className="form-input"
        />
        <input
          type="date"
          placeholder="Data de Nascimento"
          value={form.data_nascimento}
          onChange={(e) => setForm({ ...form, data_nascimento: e.target.value })}
          required
          className="form-input"
        />
        <input
          type="text"
          placeholder="Endereço"
          value={form.endereco}
          onChange={(e) => setForm({ ...form, endereco: e.target.value })}
          required
          className="form-input"
        />
        <input
          type="text"
          placeholder="Telefone"
          value={form.telefone}
          onChange={(e) => setForm({ ...form, telefone: e.target.value })}
          required
          className="form-input"
        />
        <div style={{ marginTop: 8 }}>
          <button type="submit" className="btn btn-primary" style={{ marginRight: 10 }}>
            {editId ? 'Atualizar' : 'Criar'}
          </button>
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setForm({ nome: '', data_nascimento: '', endereco: '', telefone: '' }); }} className="btn btn-ghost">
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Data Nascimento</th>
              <th>Endereço</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.id}</td>
                <td>{aluno.nome}</td>
                <td>{aluno.data_nascimento}</td>
                <td>{aluno.endereco}</td>
                <td>{aluno.telefone}</td>
                <td>
                  <button onClick={() => handleEdit(aluno)} className="btn btn-ghost" style={{ marginRight: 8 }}>Editar</button>
                  <button onClick={() => handleDelete(aluno.id!)} className="btn btn-ghost">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
