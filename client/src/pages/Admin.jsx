import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash, SignOut } from 'phosphor-react';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const [listaProdutos, setListaProdutos] = useState([]);
  const [editId, setEditId] = useState(null);
  
  const [formData, setFormData] = useState({
    nome: '', descricao: '', preco: '', imagem: '', categoria: 'Encomenda', estoque: 1000
  });

  const API_URL = 'http://localhost:3000/api/produtos';

  const handleLogout = () => {
    localStorage.removeItem('rsk-admin-token');
    navigate('/login-admin');
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const response = await axios.get(API_URL);
      setListaProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar lista:", error);
    }
  };

  useEffect(() => {
    if (formData.categoria === 'Pronta Entrega') {
      setFormData(prev => ({ ...prev, estoque: 1 }));
    } else {
      setFormData(prev => ({ ...prev, estoque: 1000 }));
    }
  }, [formData.categoria]);
  
  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (produto) => {
    setEditId(produto._id);
    setFormData({
      nome: produto.nome,
      descricao: produto.descricao || '',
      preco: produto.preco,
      imagem: produto.imagem,
      categoria: produto.categoria,
      estoque: produto.estoque
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setFormData({ nome: '', descricao: '', preco: '', imagem: '', categoria: 'Encomenda', estoque: 1000 });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que quer apagar esse produto?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchProdutos();
      } catch (error) {
        alert("Erro ao deletar.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, formData);
        alert('Produto atualizado com sucesso! 🔄');
      } else {
        await axios.post(API_URL, formData);
        alert('Produto cadastrado com sucesso! 🚀');
      }
      handleCancelEdit();
      fetchProdutos();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar no banco de dados.');
    }
  };

  return (
    <div className="cadastro-container">
      <div className="header-painel">
        <h2>Painel Admin 🐉</h2>
        
        <button onClick={handleLogout} className="btn-sair">
          <SignOut size={20} />
          Sair
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="form-cadastro">
         <div className="form-header">
           <h3>{editId ? `✏️ Editando: ${formData.nome}` : '✨ Novo Produto'}</h3>
        </div>

        <label>Nome do Produto:</label>
        <input name="nome" value={formData.nome} onChange={handleChange} required placeholder="Ex: Nike Dunk Low" />

        <div className="linha-dupla">
          <div className="campo">
            <label>Preço (R$):</label>
            <input name="preco" type="number" value={formData.preco} onChange={handleChange} required placeholder="999.90" />
          </div>

          <div className="campo">
            <label>Categoria:</label>
            <select name="categoria" value={formData.categoria} onChange={handleChange} required>
              <option value="Encomenda">Encomenda (Catálogo)</option>
              <option value="Pronta Entrega">Pronta Entrega</option>
              <option value="Destaques">Destaques (Home)</option>
            </select>
          </div>
        </div>

        <div className="info-estoque">
          {formData.categoria === 'Pronta Entrega' ? (
            <span className="badge-unico">📦 Item Único (Estoque: 1)</span>
          ) : (
            <span className="badge-infinito">✈️ Encomenda (Estoque Livre)</span>
          )}
        </div>

        <label>URL da Imagem:</label>
        <input name="imagem" value={formData.imagem} onChange={handleChange} required placeholder="https://..." />
        
        {formData.imagem && <img src={formData.imagem} alt="Preview" className="preview-img" />}

        <label>Descrição:</label>
        <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows="3" placeholder="Detalhes, Tamanho BR, etc..." />
        {editId ? (
          <div className="form-actions">
            <button type="submit" className="btn-update">
              🔄 Atualizar Dados
            </button>
            
            <button type="button" onClick={handleCancelEdit} className="btn-cancelar">
              ❌ Cancelar
            </button>
          </div>
        ) : (
          <button type="submit" className="btn-salvar">
            Cadastrar Produto
          </button>
        )}

      </form>

      <div className="lista-produtos-admin">
        <h3>📦 Produtos no Banco ({listaProdutos.length})</h3>
        <div className="tabela-scroll">
          <table>
            <thead>
              <tr>
                <th>Foto</th>
                <th>Nome</th>
                <th>Preço</th>
                <th>Cat.</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {listaProdutos.map((prod) => (
                <tr key={prod._id}>
                  <td><img src={prod.imagem} alt="" className="thumb-mini"/></td>
                  <td>{prod.nome}</td>
                  <td>R$ {Number(prod.preco).toFixed(2)}</td>
                  <td>{prod.categoria}</td>
                  <td className="actions-cell">
                    <button onClick={() => handleEdit(prod)} className="btn-icon edit" title="Editar">
                      <Pencil size={20} />
                    </button>
                    <button onClick={() => handleDelete(prod._id)} className="btn-icon trash" title="Excluir">
                      <Trash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;