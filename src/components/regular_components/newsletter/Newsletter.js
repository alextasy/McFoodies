import React, { useContext, useEffect, useState } from 'react';
import Button from '../button/Button';
import Modal, {closeModal} from '../modal/Modal';
import {AuthContext} from '../../../context/AuthContext';
import {database as db} from '../../../firebase';
import Spinner from '../spinner/Spinner';
import './Newsletter.css';

function Newsletter() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);

    const [emailThatIsSubbed, setEmailThatIsSubbed] = useState(null);
    const [hasSubscribed, setHasSubscribed] = useState(false);
    const [modalMessage, setModalMessage] = useState(null);

    const authContext = useContext(AuthContext);
    const emailRegexPattern = /^[a-z,0-9][a-z, 0-9,.,_]+@[a-z,.,_]+\.[a-z]{2,4}$/i;

    useEffect(()=>{
        setEmailThatIsSubbed(authContext.userInfo.email);
        setHasSubscribed(authContext.userInfo.newsletter);
    }, [authContext]);

    const buttonStyle ={
        width: '120px',
        height: '36px',
        fontSize: '17px',
        backgroundColor: hasSubscribed ? '#434343' : null,
        cursor: hasSubscribed ? 'not-allowed' : null
    }

    const newsletterModal = 
    
        <Modal click={()=> closeModal(()=> setIsModalOpen(false))}>
            <div>{modalMessage ? modalMessage : <Spinner small={true}/>}</div>
            <Button 
                style={{width: '75%', height: '38px'}} 
                click={()=> closeModal(()=> setIsModalOpen(false))}
            >CONTINUE</Button>
        </Modal>

    const input =  
        <input
            maxLength='40' 
            className='input'
            type='email' 
            placeholder='Enter email:'
            value={inputValue} 
            onChange={(e)=> {setInputValue(e.target.value)}}
        />

    const subscribeHandler = ()=>{

        function subscribe() {

            //If we have an account but we are not signed up

            if(authContext.isAuth){                                    
                db.collection('users').doc(authContext.userID).set({
                    ...authContext.userInfo, newsletter: true
                })
            }
            //Any other email regardless of wheter account is registered with it

            db.collection('newsletter_users').doc(inputValue).set({isSigned: true}); 
            setHasSubscribed(true);
            setEmailThatIsSubbed(inputValue);
            setModalMessage(`Thank you for subscribing to our newsletter! 
                You will be receiving our latest news, promotions and discounts.`
            ) ;
        }

        //Checks if there is a doc with the name of the email .then will be executed if there is one

        db.collection('newsletter_users').doc(inputValue).get().then(
            (doc)=> {
                if(doc.data().isSigned){ 
                    setHasSubscribed(true);
                    setEmailThatIsSubbed(inputValue);
                    setModalMessage(`${inputValue} is already subscribed to our newsletter.`);
                    return;
                }
                subscribe();    
            }
        )
        .catch(subscribe); //.catch will be executed if there is no doc with the email entered
    }
    

    return (
        <div className='Newsletter'>

            <span>New product information | Promotions | Discounts</span>
            <div className='box'>

                {hasSubscribed ? <span className='input'>{`${emailThatIsSubbed} is subscribed!`}</span> : input}
                {invalidEmail ? <span className='invalid'>Invalid email!</span> : null}
                <Button 
                    style={buttonStyle} 
                    click={()=> {
                        if(hasSubscribed) return;
                        if(!emailRegexPattern.test(inputValue) || inputValue === ''){
                            setInvalidEmail(true);
                            return;
                        }
                        setInvalidEmail(false);
                        subscribeHandler();
                        setIsModalOpen(true);
                               
                    }}
                >{hasSubscribed ? 'SUBSCRIBED' : 'SUBSCRIBE'}</Button>
            </div>
            
            {isModalOpen ? newsletterModal : null}
        </div>
    )
}

export default Newsletter
