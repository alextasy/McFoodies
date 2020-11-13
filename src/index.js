import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';
import CartContextProvider from './context/CartContext';

ReactDOM.render(
<BrowserRouter> 
    <AuthContextProvider>
      <CartContextProvider>
         <App />
      </CartContextProvider>
    </AuthContextProvider>  
  </BrowserRouter> ,
  document.getElementById('root')
);