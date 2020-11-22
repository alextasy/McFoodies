import React, { useContext, useRef, useState, useEffect } from 'react';
import './Cart.css'
import cartIcon from '../../../images/icons/cart.png'
import {CartContext} from '../../../context/CartContext';
import Button from '../button/Button';
import {withRouter} from 'react-router-dom';
import OrderSummary from '../order_summary/OrderSummary';

function Cart(props) {


    const context = useContext(CartContext);

    const numberOfItemsInCart = context.cartItems.reduce((numberOfItems, item)=>{
        return numberOfItems + item.quantity;
    }, 0);


    //OPENING AND CLOSING THE POPUP

    const [isCartPopUpOpen, setIsCartPopUpOpen] = useState(false); 
    const [numberOfItemsBeforeUpdate, setNumberOfItemsBeforeUpdate] = useState(0);

    const cartPopUpRef = useRef();
    const fadeOutAnimation = 'fade-in 400ms forwards ease-in alternate-reverse';
    const timeoutRef = useRef();        //We use refs since rerenders don't delet timers but reset varibles that hold those timers
    const nestedTimeoutRef = useRef();

    const showCartPopUp = ()=>{
        if(!isCartPopUpOpen) setIsCartPopUpOpen(true);
        
        clearTimeout(timeoutRef.current);
        clearTimeout(nestedTimeoutRef.current); // Clearing this prevents from a bug where isCartOpen gets updated to a negative when it shouldn't
    }

    const hideCartPopUp = (closeAfter)=>{
        // Async since there is a slight delay from when the component renders and the ref gets its value
        const timeout = setTimeout(async ()=> {          
            const popUp = await cartPopUpRef.current;

            popUp.style.animation = fadeOutAnimation;
            const nestedTimeout = setTimeout(()=> setIsCartPopUpOpen(false), 350); // 350 instead of 400 to no trigger onAnimationEnd

            nestedTimeoutRef.current = nestedTimeout;

        }, closeAfter ? closeAfter : 550);

        timeoutRef.current = timeout;
    }

    // When item gets added to the cart, automatically show the popup and hold it for longer
    useEffect(() => {
        if(numberOfItemsInCart > numberOfItemsBeforeUpdate) { //Opens cart if an item was added but doesn't if it was removed
            showCartPopUp();
            hideCartPopUp(2000);
        }
        setNumberOfItemsBeforeUpdate(numberOfItemsInCart);
    // eslint-disable-next-line
    }, [numberOfItemsInCart]);

    // CART POP UP COMPONENT

    const cartPopUp = 
        <div 
            className='cart_pop_up' 
            onMouseEnter={()=> showCartPopUp()}
            onMouseLeave={()=> hideCartPopUp()}
            onAnimationEnd={(e)=> e.target.style.animation = 'none'} //Resets animation so fade out can be played
            ref={cartPopUpRef}>

            <div className='items_container'>
                <OrderSummary maxHeight='calc(100vh - 285px)'/>
            </div>

            <div className='checkout_section'>
                <span>Total: ${context.total.toFixed(2)}</span>
                <Button click={()=> props.history.push('/checkout')}>CHECKOUT</Button>
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


export default withRouter(Cart);
