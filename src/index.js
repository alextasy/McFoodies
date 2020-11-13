import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import AuthContextProvider from './Context/AuthContext';
import CartContextProvider from './Context/CartContext';

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