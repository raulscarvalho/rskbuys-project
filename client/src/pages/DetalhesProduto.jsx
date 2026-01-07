import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { ShoppingCart, ArrowLeft } from 'phosphor-react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import './DetalhesProduto.css';

const DetalhesProduto = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [produto, setProduto] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function carregarProduto() {
      try {
        const resposta = await api.get(`/produtos/${id}`);
        setProduto(resposta.data);
      } catch (error) {
        console.error("Erro ao carregar produto", error);
      }
    }
    carregarProduto();
  }, [id]);

  if (!produto) return <div className="loading">Carregando detalhes...</div>;

  return (
    <div className="detalhes-container">
      <button className="btn-voltar" onClick={() => navigate(-1)}>
        <ArrowLeft size={24} weight="bold" />
        Voltar para a Loja
      </button>

      <div className="detalhes-grid">
        <div className="img-area-detalhe">
          <img src={produto.imagem} alt={produto.nome} />
        </div>

        <div className="info-area-detalhe">
          <span className="categoria-tag">{produto.categoria}</span>
          <h1>{produto.nome}</h1>
          <h2 className="preco-detalhe">R$ {Number(produto.preco).toFixed(2)}</h2>
          
          <p className="descricao-texto">{produto.descricao}</p>
          
          <div className="area-botao">
            <button 
              onClick={() => addToCart(produto)} 
              className="btn-adicionar-carrinho"
            >
              <ShoppingCart size={32} weight="bold" style={{marginRight: '10px'}} />
              ADICIONAR AO CARRINHO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesProduto;