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
    const numberOfItemsBeforeUpdate = useRef(0);

    const cartPopUpRef = useRef();
    const fadeOutAnimation = 'fade-in 400ms forwards ease-in alternate-reverse';
    const startClosingAfterTimeoutRef = useRef();  //We use refs since rerenders don't delete timers but reset varibles that hold those timers
    const closeTimeoutRef = useRef();

    let mouseIsOver = useRef(false);


    const showCartPopUp = ()=>{
        if(!isCartPopUpOpen) setIsCartPopUpOpen(true);
        
        clearTimeout(startClosingAfterTimeoutRef.current);
        clearTimeout(closeTimeoutRef.current); // Clearing this prevents from a bug where isCartOpen gets updated to a negative when it shouldn't
    }

    const hideCartPopUp = (closeAfter)=>{

        // Async since there is a slight delay from when the component renders and the ref gets its value
        const startClosingAfterTimeout = setTimeout(async ()=> {          
            const popUp = await cartPopUpRef.current;

            if(popUp) popUp.style.animation = fadeOutAnimation; // if prevents a crash when the item has been removed but there is a new timer

            const closeTimeout = setTimeout(()=> setIsCartPopUpOpen(false), 350); // 350 instead of 400 to no trigger onAnimationEnd

            closeTimeoutRef.current = closeTimeout;

        }, closeAfter ? closeAfter : 550);

        startClosingAfterTimeoutRef.current = startClosingAfterTimeout;
    }


    useEffect(() => {
        // Opens cart if an item was added but doesn't if it was removed 
        // Checks if mouse is over the popup to not close it when quantity is updated through the dropdown

        if(numberOfItemsInCart > numberOfItemsBeforeUpdate.current && !mouseIsOver.current){  
            showCartPopUp();
            hideCartPopUp(2000);
        }
        numberOfItemsBeforeUpdate.current = numberOfItemsInCart;
    // eslint-disable-next-line
    }, [numberOfItemsInCart]);

    // CART POP UP COMPONENT

    const cartPopUp = 
        <div 
            className='cart_pop_up' 
            onMouseEnter={()=> showCartPopUp()}
            onMouseLeave={()=> {hideCartPopUp(); mouseIsOver.current = false;}}
            onMouseOver={()=> mouseIsOver.current = true}
            onAnimationEnd={(e)=> e.target.style.animation = 'none'} //Resets animation so fade out can be played
            ref={cartPopUpRef}>

            <div className='items_container'>
                <OrderSummary maxHeight='395px'/>
            </div>

            <div className='checkout_section'>
                <span>Total: ${context.total.toFixed(2)}</span>
                <Button click={()=>{
                    setIsCartPopUpOpen(false);
                    props.history.push('/checkout');
                }}>CHECKOUT</Button>
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
