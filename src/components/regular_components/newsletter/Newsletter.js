import React, { useContext, useEffect, useState } from 'react';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import {AuthContext} from '../../../context/AuthContext';
import './Newsletter.css';

function Newsletter() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [hasSubscribed, setHasSubscribed] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(false);

    const authContext = useContext(AuthContext);

    useEffect(()=>{
        setHasSubscribed(authContext.userInfo.newsletter);
        console.log(hasSubscribed, authContext.userInfo.newsletter);
        
    }, [authContext.userInfo.newsletter])

    const buttonStyle ={
        width: '120px',
        height: '36px',
        fontSize: '17px',
        backgroundColor: hasSubscribed ? '#434343' : null,
        cursor: hasSubscribed ? 'not-allowed' : null
    }

    const emailRegexPattern = /^[a-z,0-9][a-z, 0-9,.,_]+@[a-z,.,_]+\.[a-z]{2,4}$/i;
    const newsletterModal = 
    
        <Modal click={()=> setIsModalOpen(false)}>
            <div>Thank you for subscribing to our newsletter! We will be emailing our latest news, promotions and discounts to you.</div>
            <Button 
                style={{width: '120px', height: '38px'}} 
                click={()=> setIsModalOpen(false)}
            >CONTINUE</Button>
        </Modal>

    const input =  
        <input
            maxLength='40' 
            className='input'
            type='email' 
            placeholder='Enter email:'
            value={inputValue} 
            onChange={(e)=> setInputValue(e.target.value)}
        />


    return (
        <div className='Newsletter'>

            <span>New product information | Promotions | Discounts</span>
            <div className='box'>

                {hasSubscribed ? <span className='input'>{`${inputValue} is subscribed!`}</span> : input}
                {invalidEmail ? <span className='invalid'>Invalid email!</span> : null}
                <Button 
                    style={buttonStyle} 
                    click={()=> {
                        if(hasSubscribed) return;
                        if(!emailRegexPattern.test(inputValue)){
                            setInvalidEmail(true);
                            return;
                        }
                        setInvalidEmail(false);
                        setIsModalOpen(true);
                        setHasSubscribed(true);       
                    }}
                >{hasSubscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}</Button>
            </div>
            
            {isModalOpen ? newsletterModal : null}
        </div>
    )
}

export default Newsletter
