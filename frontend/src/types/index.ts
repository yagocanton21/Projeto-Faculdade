export interface Aluno {
  id?: number;
  nome: string;
  data_nascimento: string;
  endereco: string;
  telefone: string;
}

export interface Professor {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
}

export interface WebSocketMessage {
  type: string;
  data: any;
}
