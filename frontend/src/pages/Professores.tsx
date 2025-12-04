import { useEffect, useState } from 'react';
import { professorService } from '../services/api';
import { Professor, WebSocketMessage } from '../types';
import { useWebSocket } from '../hooks/useWebSocket';

export default function Professores() {
  const [professores, setProfessores] = useState<Professor[]>([]);
  const [form, setForm] = useState<Professor>({ nome: '', email: '', telefone: '' });
  const [editId, setEditId] = useState<number | null>(null);
  const { sendMessage, lastMessage } = useWebSocket();

  useEffect(() => {
    loadProfessores();
  }, []);

  // Reagir às mensagens do WebSocket
  useEffect(() => {
    if (lastMessage && lastMessage.type && lastMessage.type.startsWith('professor:')) {
      console.log('Notificação WebSocket recebida:', lastMessage);
      loadProfessores(); // Recarrega a lista quando recebe notificação
    }
  }, [lastMessage]);

  const loadProfessores = async () => {
    try {
      const response: any = await professorService.getAll();
      setProfessores(response.data.data || []);
    } catch (error) {
      console.error('Erro ao carregar professores:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await professorService.update(editId, form);
        sendMessage?.({ type: 'entity_update', data: { entity: 'professor', action: 'updated', id: editId } } as WebSocketMessage);
      } else {
        const res: any = await professorService.create(form);
        const createdId = res?.data?.data?.id ?? res?.data?.id ?? null;
        sendMessage?.({ type: 'entity_update', data: { entity: 'professor', action: 'created', id: createdId } } as WebSocketMessage);
      }
      setForm({ nome: '', email: '', telefone: '' });
      setEditId(null);
      loadProfessores();
    } catch (error) {
      console.error('Erro ao salvar professor:', error);
    }
  };

  const handleEdit = (professor: Professor) => {
    setForm(professor);
    setEditId(professor.id!);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Deseja excluir este professor?')) {
      try {
        await professorService.delete(id);
        sendMessage?.({ type: 'entity_update', data: { entity: 'professor', action: 'deleted', id } } as WebSocketMessage);
        loadProfessores();
      } catch (error) {
        console.error('Erro ao excluir professor:', error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Gerenciar Professores</h1>
      
      <form onSubmit={handleSubmit} className="card" style={{ marginBottom: '20px' }}>
        <h2>{editId ? 'Editar' : 'Novo'} Professor</h2>
        <input
          type="text"
          placeholder="Nome"
          value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })}
          required
          className="form-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
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
            <button type="button" onClick={() => { setEditId(null); setForm({ nome: '', email: '', telefone: '' }); }} className="btn btn-ghost">
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
              <th>Email</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {professores.map((professor) => (
              <tr key={professor.id}>
                <td>{professor.id}</td>
                <td>{professor.nome}</td>
                <td>{professor.email}</td>
                <td>{professor.telefone}</td>
                <td>
                  <button onClick={() => handleEdit(professor)} className="btn btn-ghost" style={{ marginRight: 8 }}>Editar</button>
                  <button onClick={() => handleDelete(professor.id!)} className="btn btn-ghost">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
