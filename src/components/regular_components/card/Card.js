import React from 'react';
import Button from '../button/Button';
import './Card.css';

function Card(props) {

    const buttonStyle = {
        width: '135px', 
        height: '35px',
    }

    return (
        <div className='Card'>
            
            <div>
                <h1>{props.title}</h1>
                <img src={props.imageSrc} alt={props.title}></img>
                <p>{props.description}</p>
                {props.price ? <div className='price'>${props.price}</div> : null}
            </div>
            <Button className='Button' style={buttonStyle}>{props.buttonText}</Button>
        </div>
    )
}

export default Card;