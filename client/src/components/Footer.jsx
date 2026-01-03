import { FaInstagram, FaWhatsapp, FaEnvelope, FaCreditCard } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section">
          <h3>RSK<span className="text-red">Buys</span></h3>
          <p>As melhores peças, diretamente das fábricas chinesas para você.</p>
        </div>

        <div className="footer-section">
          <h3>Loja</h3>
          <ul>
            <li><a href="/">Início</a></li>
            <li><a href="/pronta-entrega">Pronta Entrega</a></li>
            <li><a href="/catalogo">Catálogo Completo</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contato</h3>
          <div className="contact-item">
            <FaWhatsapp className="icon-footer" /> (85)92004-8598
          </div>
          <div className="contact-item">
            <FaInstagram className="icon-footer" /> @rskbuys
          </div>
          <div className="contact-item">
            <FaEnvelope className="icon-footer" /> rskbuys@gmail.com
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 RSKBuys. Todos os direitos reservados.</p>
        <div className="payment-icons">
          <span>Aceitamos:</span> 
          <FaCreditCard /> PIX e Cartão
        </div>
      </div>
    </footer>
  );
};

export default Footer;