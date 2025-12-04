import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Alunos from './pages/Alunos';
import Professores from './pages/Professores';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />

        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alunos" element={<Alunos />} />
            <Route path="/professores" element={<Professores />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
