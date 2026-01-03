import { useEffect, useState } from 'react';
import api from '../services/api';
import ProdutoCard from '../components/ProdutoCard';
import './Home.css';

const Catalogo = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarCatalogo() {
      try {
        const resposta = await api.get('/produtos');

        const listaCatalogo = resposta.data.filter(p => 
          p.categoria === 'Catalogo' || p.categoria === 'Destaques'
        );
        
        setProdutos(listaCatalogo);
        setLoading(false);
      } catch (error) {
        console.error("Erro:", error);
        setLoading(false);
      }
    }
    buscarCatalogo();
  }, []);

  if (loading) return <div className="loading">Carregando catálogo...</div>;

  return (
    <div className="home-container">
      <h2 className="titulo-secao">Catálogo Completo 📋</h2>
      <div className="grid-produtos">
        {produtos.map((produto) => (
          <ProdutoCard key={produto._id} produto={produto} />
        ))}
      </div>
    </div>
  );
};

export default Catalogo;