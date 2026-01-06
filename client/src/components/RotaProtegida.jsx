import { Navigate } from 'react-router-dom';

const RotaProtegida = ({ children }) => {
  const isAutenticado = localStorage.getItem('rsk-admin-token');
  return isAutenticado ? children : <Navigate to="/login-admin" />;
};

export default RotaProtegida;