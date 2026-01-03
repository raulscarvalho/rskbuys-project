import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Catalogo from './pages/Catalogo';           
import ProntaEntrega from './pages/ProntaEntrega'; 
import CadastroProduto from './pages/CadastroProduto';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      
      <div className="content-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pronta-entrega" element={<ProntaEntrega />} />
          <Route path="/catalogo" element={<Catalogo />} />
          
          {/* rota do admin XD*/}
          <Route path="/admin" element={<CadastroProduto />} /> 
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App;