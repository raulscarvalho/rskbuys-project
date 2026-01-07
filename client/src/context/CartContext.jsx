import { createContext, useState, useContext, useEffect } from 'react';

export const CartContext = createContext(); 

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('rsk-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  useEffect(() => {
    localStorage.setItem('rsk-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const itemExistente = cartItems.find((item) => item._id === product._id);

    if (itemExistente) {
      if (product.categoria === 'Pronta Entrega') {
        alert("Este item é de Pronta Entrega e já está no carrinho (peça única)!");
        return;
      }

      setCartItems((prevItems) => 
        prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantidade: Math.min(item.quantidade + 1, 50) }
            : item
        )
      );
      alert("Mais uma unidade adicionada ao carrinho! (+1)");

    } else {
      setCartItems((prevItems) => [...prevItems, { ...product, quantidade: 1 }]);
      alert("Produto adicionado ao carrinho! 🛒");
    }
  };

  const updateQuantity = (id, type) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item._id === id) {
          if (item.categoria === 'Pronta Entrega' && type === 'increase') return item;
          
          const novaQtd = type === 'increase' ? item.quantidade + 1 : item.quantidade - 1;
          if (novaQtd >= 1 && novaQtd <= 50) {
            return { ...item, quantidade: novaQtd };
          }
        }
        return item;
      });
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCartItems([]); 
    localStorage.removeItem('rsk-cart'); 
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantidade, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);