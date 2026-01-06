import { useCart } from '../context/CartContext';
import { Trash, WhatsappLogo, Minus, Plus, CreditCard } from 'phosphor-react';
import { Link, useNavigate } from 'react-router-dom';
import './Carrinho.css';

const Carrinho = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate(); 
  const total = cartItems.reduce((acc, item) => {
    const valor = item.preco || item.price || 0;
    return acc + (Number(valor) * item.quantidade);
  }, 0);

  const totalFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(total);

  const finalizarPedidoZap = () => {
    const telefone = "85920048598";
    let mensagem = "*Olá! Gostaria de finalizar meu pedido no RSK Buys:*\n\n";
    cartItems.forEach(item => {
      mensagem += `- (${item.quantidade}x) ${item.nome} \n`;
    });
    mensagem += `\n*Total: ${totalFormatado}*`;
    const link = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank');
  };

  return (
    <div className="carrinho-container">
      <h2>Seu Carrinho 🛒</h2>

      {cartItems.length === 0 ? (
        <div className="carrinho-vazio">
          <p>Seu carrinho está vazio.</p>
          <Link to="/catalogo" className="btn-voltar">Ver Produtos</Link>
        </div>
      ) : (
        <>
          <div className="lista-itens">
            {cartItems.map((item) => (
              <div key={item._id} className="item-carrinho">
                <img src={item.imagem} alt={item.nome} />
                
                <div className="info-item">
                  <h3>{item.nome}</h3>
                  <p className="preco-unitario">
                    {/* Exibe preco ou price */}
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.preco || item.price)}
                  </p>
                  
                  {item.categoria === 'Pronta Entrega' && (
                    <span className="badge-estoque">Última Unidade</span>
                  )}
                </div>

                <div className="qtd-controls">
                  <button 
                    onClick={() => updateQuantity(item._id, 'decrease')}
                    disabled={item.quantidade <= 1}
                  >
                    <Minus size={16} />
                  </button>
                  
                  <span>{item.quantidade}</span>
                  
                  <button 
                    onClick={() => updateQuantity(item._id, 'increase')}
                    disabled={item.quantidade >= 50 || item.categoria === 'Pronta Entrega'}
                    className={item.categoria === 'Pronta Entrega' ? 'disabled' : ''}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button 
                  onClick={() => removeFromCart(item._id)} 
                  className="btn-remove"
                >
                  <Trash size={24} />
                </button>
              </div>
            ))}
          </div>

          <div className="resumo-pedido">
            <h3>Total: {totalFormatado}</h3>
            
            <div className="acoes-carrinho">
              <button onClick={() => navigate('/checkout')} className="btn-checkout">
                <CreditCard size={24} weight="bold" />
                Pagar no Site
              </button>

              <button onClick={finalizarPedidoZap} className="btn-whatsapp">
                <WhatsappLogo size={24} weight="bold" />
                Finalizar no WhatsApp
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrinho;