import React, {useContext} from 'react';
import {CartContext} from '../../../context/CartContext';
import './OrderSummary.css';


function OrderSummary(props) {
    
    const context = useContext(CartContext);

    const itemsInCart = context.cartItems.map((item) =>
        
        <div className='item' key={item.title}>
            <img src={item.imageSrc} alt={item.title}/>

            <div className ='properties_section'>
                <h1>{item.title}</h1>
                <span>Quantity: {item.quantity}</span>
                <span>Price: ${item.price}</span>
            </div>

            <div className ='total_section'>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <span id='remove' onClick={()=> removeItem(item)}>Remove</span>
            </div>
            
        </div>
    );

    const removeItem = (itemToRemove)=>{
        const itemsToStay = context.cartItems.filter((item)=>{
            return (item !== itemToRemove);
        });
        context.setCartItems(itemsToStay);
    }

    const empty = <div className='item'><p>Add items in the cart to be able to order.</p></div>

    return (
        <div className='Order_summary' style={{maxHeight: props.maxHeight}}>
            {itemsInCart.length > 0 ? itemsInCart : empty}
        </div>
    )
}

export default OrderSummary
