import { Link } from 'react-router-dom';
import './ProdutoCard.css';

const ProdutoCard = ({ produto }) => {
  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(produto.preco);

  return (
    <div className="produto-card">
      <div className="img-container">
        <img src={produto.imagem} alt={produto.nome} className="produto-img" />
      </div>

      <div className="produto-info">
        <h3>{produto.nome}</h3>
        <p className="produto-preco">{precoFormatado}</p>
        <Link to="#" className="btn-detalhes">
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default ProdutoCard;