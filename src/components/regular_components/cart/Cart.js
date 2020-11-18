import React, { useContext, useRef, useState } from 'react';
import './Cart.css'
import cartIcon from '../../../images/icons/cart.png'
import {CartContext} from '../../../context/CartContext';
import Button from '../button/Button';

function CartPopUp(props) {

    //CART ICON

    const context = useContext(CartContext);
    let total = 0;

    const numberOfItemsInCart = context.cartItems.reduce((numberOfItems, item)=>{
        return numberOfItems + item.quantity;
    }, 0);

    // CART POPUP CONTENT 

    const empty = <div className='item'><p>Add items in the cart to be able to order.</p></div>

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
    const cartPopUpRef = useRef();
    const fadeOutAnimation = 'fade-in 400ms forwards ease-in alternate-reverse';
    let timeout, nestedTimeout;

    const showCartPopUp = ()=>{
        setIsCartPopUpOpen(true);

        clearTimeout(timeout);
        clearTimeout(nestedTimeout); // Clearing this prevents from a bug where isCartOpen gets updated to a negative when it shouldn't
    }

    const hideCartPopUp = (closeAfter)=>{
        const popUpStyle = cartPopUpRef.current.style;

        timeout = setTimeout(()=> {
            popUpStyle.animation = fadeOutAnimation;
            nestedTimeout = setTimeout(()=> setIsCartPopUpOpen(false), 350); // 350 instead of 400 to no trigger onAnimationEnd
        }, closeAfter ? closeAfter : 550)
    }

    // CART POP UP COMPONENT

    const cartPopUp = 
        <div 
            className='cart_pop_up' 
            onMouseEnter={()=> showCartPopUp()}
            onMouseLeave={()=> hideCartPopUp()}
            onAnimationEnd={(e)=> e.target.style.animation = 'none'} //Resets animation so fade out can be played
            ref={cartPopUpRef}>
                
            {itemsInCart.length > 0 ? itemsInCart : empty}
            <div className='checkout_section'>
                <span>Total: ${total.toFixed(2)}</span>
                <Button>CHECKOUT</Button>
            </div>
        </div>
  
    return (
        <div className= 'Cart'>

            <div 
                className= 'cart_icon'
                onMouseEnter={()=> showCartPopUp()}
                onMouseLeave={()=> hideCartPopUp()}>
                    
                <div id='number_of_items'>{numberOfItemsInCart}</div>
                <img src={cartIcon} alt='Cart icon' height='33'></img>

            </div>

            {isCartPopUpOpen ? cartPopUp : null} 

        </div>
        
    )
}


export default CartPopUp;
