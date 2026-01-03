import { Link } from 'react-router-dom';
import './ProdutoCard.css';

const ProdutoCard = ({ produto }) => {
  return (
    <div className="produto-card">
      <img src={produto.imagem} alt={produto.nome} className="produto-img" />
      
      <div className="produto-info">
        <h3>{produto.nome}</h3>
        <p className="produto-preco">R$ {produto.preco.toFixed(2)}</p>
        
        <Link to={`/produto/${produto._id}`} className="btn-detalhes">
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default ProdutoCard;