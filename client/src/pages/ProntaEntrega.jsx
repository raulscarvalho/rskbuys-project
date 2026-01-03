// client/src/pages/ProntaEntrega.jsx
import { useEffect, useState } from 'react';
import api from '../services/api';
import ProdutoCard from '../components/ProdutoCard';
import './Home.css'; 

const ProntaEntrega = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarPE() {
      try {
        const resposta = await api.get('/produtos');
        
        const listaPE = resposta.data.filter(p => p.categoria === 'Pronta Entrega');
        
        setProdutos(listaPE);
        setLoading(false);
      } catch (error) {
        console.error("Erro:", error);
        setLoading(false);
      }
    }
    buscarPE();
  }, []);

  if (loading) return <div className="loading">Verificando estoque físico...</div>;

  return (
    <div className="home-container">
      <h2 className="titulo-secao">Pronta Entrega sedex 🚚</h2>

      {produtos.length === 0 ? (
        <p style={{textAlign: 'center', color: '#fff'}}>Tudo esgotado no momento!</p>
      ) : (
        <div className="grid-produtos">
          {produtos.map((produto) => (
            <ProdutoCard key={produto._id} produto={produto} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProntaEntrega;