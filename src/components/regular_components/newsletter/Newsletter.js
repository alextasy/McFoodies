import React from 'react';
import Button from '../button/Button';
import './Newsletter.css';

const buttonStyle ={
    width: '120px',
    height: '36px',
    fontSize: '17px'
}

function Newsletter() {
    return (
        <div className='Newsletter'>
            <span>New product information | Promotions | Discounts</span>
            <div className='box'>
                <input type='text' placeholder='Enter email:'/>
                <Button style={buttonStyle}>SUBSCRIBE</Button>
            </div>
        </div>
    )
}

export default Newsletter
