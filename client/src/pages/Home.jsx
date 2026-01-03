import { useEffect, useState } from 'react';
import api from '../services/api';
import ProdutoCard from '../components/ProdutoCard';
import './Home.css';

const Home = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarProdutos() {
      try {
        const resposta = await api.get('/produtos');
        // FILTRO: Aqui pegamos APENAS o que é 'Destaques'
        const apenasDestaques = resposta.data.filter(p => p.categoria === 'Destaques');
        setProdutos(apenasDestaques);
        setLoading(false);
      } catch (error) {
        console.error("Erro:", error);
        setLoading(false);
      }
    }
    buscarProdutos();
  }, []);

  if (loading) return <div className="loading">Carregando estoque...</div>;

  return (
    <div className="home-container">
      <h2 className="titulo-secao">Destaques da Semana 🔥</h2>
      
      <div className="grid-produtos">
        {produtos.map((produto) => (
          <ProdutoCard key={produto._id} produto={produto} />
        ))}
      </div>
    </div>
  );
};

export default Home;