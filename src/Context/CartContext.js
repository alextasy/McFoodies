import React, { useState } from 'react'

export const CartContext = React.createContext({
    cartItems: [],
    setCartItems:()=>{}
})

const CartContextProvider = (props)=>{
    const [cartItemsState, setCartItemsState] = useState([]);

    return(
        <CartContext.Provider value={{
            cartItems: cartItemsState, setCartItems: setCartItemsState,
         }}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;