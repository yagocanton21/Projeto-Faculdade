import { useEffect, useState } from 'react';
import { useWebSocket } from '../hooks/useWebSocket';
import { alunoService, professorService } from '../services/api';

export default function Home() {
  const { isConnected, lastMessage } = useWebSocket();
  const [stats, setStats] = useState({ alunos: 0, professores: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [alunosRes, professoresRes]: any[] = await Promise.all([
        alunoService.getAll(),
        professorService.getAll()
      ]);
      setStats({
        alunos: alunosRes.data.data?.length || 0,
        professores: professoresRes.data.data?.length || 0
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  return (
    <div className="container">
      <h1>🏫 Painel Administrativo</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '32px' }}>Bem-vindo ao Sistema de Gerenciamento Escolar Infantil</p>

      <div className="stats-grid">
        <div className="stat-card stat-primary">
          <div className="stat-icon">👨‍🎓</div>
          <div className="stat-content">
            <div className="stat-value">{stats.alunos}</div>
            <div className="stat-label">Alunos Cadastrados</div>
          </div>
        </div>

        <div className="stat-card stat-success">
          <div className="stat-icon">👩‍🏫</div>
          <div className="stat-content">
            <div className="stat-value">{stats.professores}</div>
            <div className="stat-label">Professores Ativos</div>
          </div>
        </div>

        <div className="stat-card stat-info">
          <div className="stat-icon">{isConnected ? '🟢' : '🔴'}</div>
          <div className="stat-content">
            <div className="stat-value">{isConnected ? 'Online' : 'Offline'}</div>
            <div className="stat-label">Status WebSocket</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <h2>📡 Atualizações em Tempo Real</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>Sistema conectado via WebSocket para notificações instantâneas</p>
        
        {lastMessage && lastMessage.type && (
          <div className="notification">
            <div className="notification-icon">✨</div>
            <div>
              <div className="notification-title">Nova Notificação</div>
              <div className="notification-message">
                {lastMessage.type === 'aluno:created' && '🎉 Novo aluno cadastrado!'}
                {lastMessage.type === 'aluno:updated' && '✏️ Aluno atualizado!'}
                {lastMessage.type === 'aluno:deleted' && '🗑️ Aluno removido!'}
                {lastMessage.type === 'professor:created' && '🎉 Novo professor cadastrado!'}
                {lastMessage.type === 'professor:updated' && '✏️ Professor atualizado!'}
                {lastMessage.type === 'professor:deleted' && '🗑️ Professor removido!'}
                {!lastMessage.type.includes('aluno') && !lastMessage.type.includes('professor') && 'Evento recebido'}
              </div>
            </div>
          </div>
        )}

        {!lastMessage && (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--muted)' }}>
            Aguardando notificações...
          </div>
        )}
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <h2>🚀 Recursos do Sistema</h2>
        <div className="features-grid">
          <div className="feature">
            <div className="feature-icon">📊</div>
            <div className="feature-title">CRUD Completo</div>
            <div className="feature-desc">Gerenciamento de alunos e professores</div>
          </div>
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <div className="feature-title">Tempo Real</div>
            <div className="feature-desc">Atualizações instantâneas via WebSocket</div>
          </div>
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <div className="feature-title">API REST</div>
            <div className="feature-desc">Backend robusto com Docker</div>
          </div>
          <div className="feature">
            <div className="feature-icon">🎨</div>
            <div className="feature-title">React + TypeScript</div>
            <div className="feature-desc">Frontend moderno e tipado</div>
          </div>
        </div>
      </div>
    </div>
  );
}
