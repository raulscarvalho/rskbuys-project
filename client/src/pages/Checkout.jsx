import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, User, ShieldCheck, LockKey } from 'phosphor-react';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [dados, setDados] = useState({
    nome: '', email: '', cpf: '', telefone: '',
    cep: '', endereco: '', numero: '', cidade: '', complemento: '',
    cartaoNome: '', cartaoNumero: '', cartaoValidade: '', cartaoCVV: ''
  });

  const total = cartItems.reduce((acc, item) => {
    const valor = item.preco || item.price || 0;
    return acc + (Number(valor) * item.quantidade);
  }, 0);

  const formatarCampo = (nome, valor) => {
    const apenasNumeros = valor.replace(/\D/g, '');

    switch (nome) {
      case 'telefone':
        return apenasNumeros
          .replace(/^(\d{2})(\d)/g, '($1) $2') 
          .replace(/(\d)(\d{4})$/, '$1-$2')
          .slice(0, 15);

      case 'cep':
        return apenasNumeros
          .replace(/^(\d{5})(\d)/, '$1-$2')
          .slice(0, 9);

      case 'cpf':
        return apenasNumeros
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
          .slice(0, 14);

      case 'cartaoNumero':
        return apenasNumeros
          .replace(/(\d{4})(?=\d)/g, '$1 ') 
          .slice(0, 19);

      case 'cartaoValidade':
        return apenasNumeros
          .replace(/^(\d{2})(\d)/, '$1/$2') 
          .slice(0, 5);

      case 'cartaoCVV':
        return apenasNumeros.slice(0, 4); 

      default:
        return valor;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    const camposFormatados = ['telefone', 'cep', 'cpf', 'cartaoNumero', 'cartaoValidade', 'cartaoCVV'];

    if (camposFormatados.includes(name)) {
      setDados({ ...dados, [name]: formatarCampo(name, value) });
    } else {
      setDados({ ...dados, [name]: value });
    }
  };

  const handleFinalizar = (e) => {
    e.preventDefault();
    alert("Pagamento Simulado com Sucesso! 🚀");
    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-vazio">
        <h2>Seu carrinho está vazio... 🦗</h2>
        <button onClick={() => navigate('/catalogo')}>Voltar as Compras</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="titulo-pagina">Finalizar Pedido <LockKey size={28} color="#04d361" /></h2>

      <form onSubmit={handleFinalizar} className="checkout-grid">
        
        <div className="coluna-form">
          
          <div className="card-form">
            <div className="card-header">
              <User size={24} className="icon-roxo" />
              <h3>Dados Pessoais</h3>
            </div>
            <div className="grid-inputs">
              <input 
                type="text" 
                name="nome" 
                placeholder="Nome Completo" 
                value={dados.nome} 
                onChange={handleChange} 
                required 
                className="full-width" 
              />
              <input 
                type="email" 
                name="email" 
                placeholder="E-mail" 
                value={dados.email} 
                onChange={handleChange} 
                required 
                className="full-width" 
              />
              <input 
                type="text" 
                name="cpf" 
                placeholder="CPF (000.000.000-00)" 
                value={dados.cpf} 
                onChange={handleChange} 
                maxLength="14"
                required 
              />
              <input 
                type="tel" 
                name="telefone" 
                placeholder="(DDD) 90000-0000" 
                value={dados.telefone} 
                onChange={handleChange} 
                maxLength="15"
                required 
              />
            </div>
          </div>

          <div className="card-form">
            <div className="card-header">
              <MapPin size={24} className="icon-laranja" />
              <h3>Endereço de Entrega</h3>
            </div>
            <div className="grid-inputs">
              <input 
                type="text" 
                name="cep" 
                placeholder="CEP (00000-000)" 
                value={dados.cep} 
                onChange={handleChange} 
                maxLength="9"
                required 
              />
              <input 
                type="text" 
                name="cidade" 
                placeholder="Cidade / UF" 
                value={dados.cidade} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="text" 
                name="endereco" 
                placeholder="Rua / Avenida" 
                value={dados.endereco} 
                onChange={handleChange} 
                required 
                className="full-width" 
              />
              <input 
                type="text" 
                name="numero" 
                placeholder="Número" 
                value={dados.numero} 
                onChange={handleChange} 
                required 
              />
              <input 
                type="text" 
                name="complemento" 
                placeholder="Complemento" 
                value={dados.complemento} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="card-form">
            <div className="card-header">
              <CreditCard size={24} className="icon-verde" />
              <h3>Dados do Pagamento</h3>
            </div>
            
            <div className="payment-preview">
              <div className="cartao-falso">
                <span>{dados.cartaoNumero || '**** **** **** ****'}</span>
                <div className="cartao-bottom">
                  <span>{dados.cartaoNome || 'NOME DO TITULAR'}</span>
                  <span>{dados.cartaoValidade || 'MM/AA'}</span>
                </div>
              </div>
            </div>

            <div className="grid-inputs">
              <input 
                type="text" 
                name="cartaoNumero" 
                placeholder="0000 0000 0000 0000" 
                value={dados.cartaoNumero} 
                onChange={handleChange} 
                maxLength="19"
                required 
                className="full-width" 
              />
              <input 
                type="text" 
                name="cartaoNome" 
                placeholder="Nome impresso no cartão" 
                value={dados.cartaoNome} 
                onChange={handleChange} 
                required 
                className="full-width" 
              />
              <input 
                type="text" 
                name="cartaoValidade" 
                placeholder="MM/AA" 
                value={dados.cartaoValidade} 
                onChange={handleChange} 
                maxLength="5"
                required 
              />
              <input 
                type="text" 
                name="cartaoCVV" 
                placeholder="CVV" 
                value={dados.cartaoCVV} 
                onChange={handleChange} 
                maxLength="3" 
                required 
              />
            </div>
          </div>
        </div>

        <div className="coluna-resumo">
          <div className="resumo-card sticky">
            <h3>Resumo do Pedido</h3>
            
            <div className="lista-resumo">
              {cartItems.map(item => (
                <div key={item._id} className="item-resumo">
                  <span>{item.quantidade}x {item.nome}</span>
                  <strong>R$ {(item.preco || item.price).toFixed(2)}</strong>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            <div className="total-row">
              <span>Total</span>
              <span className="preco-grande">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}
              </span>
            </div>

            <button type="submit" className="btn-pagar">
              <ShieldCheck size={24} weight="bold" />
              Confirmar Pagamento
            </button>
            
            <p className="seguranca-msg">
              <LockKey size={16} /> Ambiente 100% Seguro
            </p>
          </div>
        </div>

      </form>
    </div>
  );
};

export default Checkout;