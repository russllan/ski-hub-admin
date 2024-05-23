import React from 'react';
import { Navigate } from 'react-router-dom';
import { getLocalStorage } from '../../hooks/localStorage.helper';

const PrivateRoute = ({ element }) => {
  const token = getLocalStorage();
  return token ? element : <Navigate to="/auth" />;
};

export default PrivateRoute;
