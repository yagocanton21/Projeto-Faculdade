import axios from 'axios';
import { Aluno, Professor } from '../types';

const api = axios.create({
  // use relative baseURL so Vite dev server proxy ("/api" -> backend) works
  baseURL: '/api',
});

export const alunoService = {
  getAll: () => api.get<Aluno[]>('/alunos'),
  getById: (id: number) => api.get<Aluno>(`/alunos/${id}`),
  create: (aluno: Aluno) => api.post<Aluno>('/alunos', aluno),
  update: (id: number, aluno: Aluno) => api.put<Aluno>(`/alunos/${id}`, aluno),
  delete: (id: number) => api.delete(`/alunos/${id}`),
};

export const professorService = {
  getAll: () => api.get<Professor[]>('/professores'),
  getById: (id: number) => api.get<Professor>(`/professores/${id}`),
  create: (professor: Professor) => api.post<Professor>('/professores', professor),
  update: (id: number, professor: Professor) => api.put<Professor>(`/professores/${id}`, professor),
  delete: (id: number) => api.delete(`/professores/${id}`),
};

export default api;
