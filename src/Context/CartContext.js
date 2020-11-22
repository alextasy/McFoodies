import React, { useEffect, useState } from 'react'

export const CartContext = React.createContext({
    cartItems: [],
    setCartItems:()=>{}
})

const CartContextProvider = (props)=>{
    const [cartItemsState, setCartItemsState] = useState([]);
    const [total, setTotal] = useState(0);   

    useEffect(()=>{

        setTotal( cartItemsState.reduce((totalPrice, item)=>{
            return totalPrice + item.price * item.quantity;
        },0))

    }, [cartItemsState])
    
    return(
        <CartContext.Provider value={{
            cartItems: cartItemsState, setCartItems: setCartItemsState,
            total: total
         }}>
            {props.children}
        </CartContext.Provider>
    );
}

export default CartContextProvider;