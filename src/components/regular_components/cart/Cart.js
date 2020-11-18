import React, { useContext, useEffect, useState } from 'react';
import './Cart.css'
import cartIcon from '../../../images/icons/cart.png'
import {CartContext} from '../../../context/CartContext';
import Button from '../button/Button';

function CartPopUp(props) {

    const context = useContext(CartContext);
    let total = 0;

    const numberOfItemsInCart = context.cartItems.reduce((numberOfItems, item)=>{
        return numberOfItems + item.quantity;
    }, 0);

    const itemsInCart = context.cartItems.map((item) =>{ 
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

    //OPENING AND CLOSING THE POPUP

    const [isCartPopUpOpen, setIsCartPopUpOpen] = useState(false);
    let timeout;

    const mouseEnterHandler = ()=>{
        console.log('enter');
        setIsCartPopUpOpen(true);
        clearTimeout(timeout);
    }

    const mouseOutHandler = ()=>{
        console.log('exit');
        timeout = setTimeout(()=>setIsCartPopUpOpen(false), 1000);
    }
  
    return (
        <div className= 'Cart'>

            <div 
                className= 'cart_icon'
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseOutHandler}>
                    
                <div id='number_of_items'>{numberOfItemsInCart}</div>
                <img src={cartIcon} alt='Cart icon' height='33'></img>

            </div>

            <div 
                className='cart_pop_up' 
                style={{display: isCartPopUpOpen ? 'block' : 'none'}}
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseOutHandler}>
                    
                {itemsInCart}
                <div className='checkout_section'>
                    <span>Total: ${total.toFixed(2)}</span>
                    <Button>CHECKOUT</Button>
                </div> 

            </div>

        </div>
        
    )
}

export default CartPopUp;
