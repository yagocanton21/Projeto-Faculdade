import { Link } from 'react-router-dom';

export default function Header(){
  return (
    <header className="navbar">
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div className="brand">EscolaApp</div>
        <div style={{fontSize:12, color:'rgba(255,255,255,0.9)'}}>Painel Administrativo</div>
      </div>
      <nav style={{marginLeft:'auto'}} className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/alunos">Alunos</Link>
        <Link to="/professores">Professores</Link>
      </nav>
    </header>
  )
}
