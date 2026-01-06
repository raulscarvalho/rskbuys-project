import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalogo from './pages/Catalogo';
import ProntaEntrega from './pages/ProntaEntrega';
import DetalhesProduto from './pages/DetalhesProduto';
import Carrinho from './pages/Carrinho';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import LoginAdmin from './pages/LoginAdmin';
import RotaProtegida from './components/RotaProtegida'; 

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
            <Route path="/produto/:id" element={<DetalhesProduto />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login-admin" element={<LoginAdmin />} />

            <Route 
              path="/admin" 
              element={
                <RotaProtegida>
                  <Admin />
                </RotaProtegida>
              } 
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </CartProvider>
  )
}

export default App;