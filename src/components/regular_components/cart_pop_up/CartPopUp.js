import React, { useContext } from 'react';
import './CartPopUp.css'
import {CartContext} from '../../../context/CartContext';
import Button from '../button/Button';

function CartPopUp() {

    const context = useContext(CartContext);
    let total = 0;

    const items = context.cartItems.map((item) =>{ 
        total += (item.price * item.quantity);

        return(

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
            
        </div>)
    });

    const removeItem = (itemToRemove)=>{
        const itemsToStay = context.cartItems.filter((item)=>{
            return (item !== itemToRemove);
        });
        context.setCartItems(itemsToStay);
    }

    return (
        <div className='CartPopUp'>
            {items}
            <div className='checkout_section'>
                <span>Total: ${total.toFixed(2)}</span>
                <Button>CHECKOUT</Button>
            </div> 
        </div>
    )
}

export default CartPopUp;
