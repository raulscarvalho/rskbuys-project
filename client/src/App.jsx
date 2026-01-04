import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Carrinho from './pages/Carrinho';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import ProntaEntrega from './pages/ProntaEntrega';
import DetalhesProduto from './pages/DetalhesProduto';
import Admin from './pages/Admin';

function App() {
  return (
    <CartProvider>
      <div className="app-container">
        <Navbar />
        
        <div className="content-wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pronta-entrega" element={<ProntaEntrega />} />
            <Route path="/catalogo" element={<Catalogo />} />            
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/produto/:id" element={<DetalhesProduto />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </CartProvider>
  )
}

export default App;