import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../../context/CartContext';
import Button from '../button/Button';
import './Card.css';

function Card(props) {

    const defaultStyle = {backgroundColor: '#d90a0a'}
    const disabledStyle = {backgroundColor: '#434343'}

    const context = useContext(CartContext);
    const [buttonStyle, setButtonStyle] = useState();
    const [buttonText, setButtonText] = useState(props.buttonText);

    useEffect(()=>{
        if(props.menuItemCard){

            setButtonStyle(defaultStyle);
            setButtonText('ADD TO CART');
            
            context.cartItems.forEach((item)=>{
                if(item.quantity === 10 && props.title === item.title) {
                    setButtonStyle(disabledStyle);
                    setButtonText('MAX REACHED');
                }
            });  
        }
    // eslint-disable-next-line
    }, [context]);


    return (
        <div className='Card'>
            
            <div>
                <h1>{props.title}</h1>
                <img src={props.imageSrc} alt={props.title}></img>
                <p>{props.description}</p>
                {props.price ? <div className='price'>${props.price}</div> : null}
            </div>
            <Button className='Button' 
                    style={{width: '135px', height: '35px', ...buttonStyle}}
                    click={props.click}
            >{buttonText}</Button>
        </div>
    )
}

export default Card;