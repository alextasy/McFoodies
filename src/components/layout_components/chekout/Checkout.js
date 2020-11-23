import React, {useContext, useEffect, useState} from 'react';
import './Checkout.css';
import Container from '../container/Container';
import Button from '../../regular_components/button/Button';
import OrderSummary from '../../regular_components/order_summary/OrderSummary';
import {CartContext} from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';

function Checkout() {

    const authContext = useContext(AuthContext);
    const cartContext = useContext(CartContext);

    const [userInfo, setUserInfo] = useState({
        name: '',
        firstLine: '',
        secondLine: '',
        city: '',
        zipCode: '',
        phoneNumber: '',
        cardholderName: '',
        cardNumber: '',
        cardExpiration: '',
        cardCVC: ''
    });

    const [orderInfo, setOrderInfo] = useState({
        notes: '',
        paymentOption: 'cash'
    });

    useEffect(()=>{
        if(authContext.isAuth){
            setUserInfo({...userInfo, ...authContext.userInfo})
        }
    // eslint-disable-next-line
    },[authContext]);

    
    const updateState = (element)=>{
        const id = element.id;
        const value = element.value;
        const parentDiv = element.parentNode;
        
        element.placeholder = 'This field is required...';
        value === '' ? parentDiv.classList.add('empty') : parentDiv.classList.remove('empty');            

        (element.minLength !== -1 && value.length < element.minLength) 
            ? parentDiv.classList.add('invalid')
            : parentDiv.classList.remove('invalid');
        
        setUserInfo({...userInfo, [id]: value});
    }

    const submitForm = ()=>{
      
        const elementsToIgnore = orderInfo.paymentOption === 'cash' ? 
        ['cardholderName', 'cardNumber', 'cardExpiration', 'cardCVC'] : [];

        let formIsInvalid = false;

        Object.keys(userInfo).forEach((key)=>{
            if(userInfo[key] === ''){
                const element = document.querySelector(`#${key}`);

                if(key === 'secondLine' || elementsToIgnore.includes(key)) return; // Ignores optional fields
                if(key === 'city') {                // 'city' is a select and doesn't use the updateState function that tracks validity
                    element.classList.add('empty');
                    return;
                }
                formIsInvalid = true;
                updateState(element);
            }
        });

        if(formIsInvalid) return;
    }
    
    const creditCardFormat = (string)=>{
        const arrayFromString = string.split('');

        for(let i = 0; i < arrayFromString.length; i++){
            if(i === 4 || i === 9 || i === 14) {
                if(arrayFromString[i] === ' ') continue;

                arrayFromString.splice(i, 0, ' ');
            }
        }
        return arrayFromString.join('');
    }

    const signInReminder = 
        <div className='sign_in_reminder' style={{display: authContext.isAuth ? 'none' : 'inline-block'}}>
           <p>Sign in to have your information autofilled and keep track of your orders</p>
        </div>


    return (
        <Container class='Checkout'>
            
            {signInReminder}

            <form>

            <h2>CONTACT DETAILS:</h2> 

            <div className='input_div'>
                <label>FULL NAME:</label>
                <input 
                    type='text'
                    id='name'
                    value={userInfo.name} maxLength='30'  
                    onChange={(e) => updateState(e.target)} />
            </div>

            <div className='input_div'>
                <label>PHONE NUMBER:</label>
                <input 
                    type='text'
                    id='phoneNumber'
                    value={userInfo.phoneNumber} maxLength='15'
                    minLength='7' 
                    onChange={(e) => updateState(e.target)} />
            </div>

            <h2>DELIVERY ADDRESS:</h2>

            <div className='input_div'>
                <label>FIRST LINE OF ADDRESS:</label>
                <input 
                    type='text'
                    id='firstLine' 
                    value={userInfo.firstLine}
                    maxLength='35' 
                    onChange={(e) => updateState(e.target)} />
            </div>

            <div className='input_div'>
                <label>SECOND LINE OF ADDRESS (OPTIONAL):</label>
                <input 
                    type='text'
                    id='secondLine'
                    value={userInfo.secondLine} 
                    maxLength='35' 
                    onChange={(e) => setUserInfo({...userInfo, secondLine: e.target.value})} />
            </div>

            <div className='input_div' id='city'>
                <label>CITY:</label>
                <select 
                    onChange={(e) => setUserInfo({...userInfo, city: e.target.value})}
                    onClick={(e)=> e.target.parentNode.classList.remove('empty') // If form was submited this class was added
                }>
                        <option value=''> Choose city</option>
                        <option value='London'>London</option>
                        <option value='Manchester'>Manchester</option>
                        <option value='Swansea'>Swansea</option>
                        <option value='Bristol'>Bristol</option>
                </select>
            </div>

            <div className='input_div'>
                <label>ZIP/POSTAL CODE:</label>
                <input 
                    type='text' 
                    id='zipCode' 
                    value={userInfo.zipCode}
                    minLength='7' 
                    maxLength='7' 
                    onChange={(e) => updateState(e.target)} />
            </div>

            <h2>LEAVE A NOTE:</h2>
            
            <div className='input_div' id='notes_div'>
                <textarea 
                    id='notes'
                    placeholder='Leave us a note(eg. no onions, deliver at the back door...)'
                    value={orderInfo.notes} maxLength='250'  
                    onChange={(e) => setOrderInfo({...orderInfo, notes: e.target.value})} />
            </div>

            <h2>PAYMENT OPTIONS:</h2>

            <div className='radio'>
                <div className={orderInfo.paymentOption === 'cash' ? 'active' : ''}>
                    <span className='radio_circle' />
                    <input 
                        type='radio' 
                        name = 'payment'
                        checked={orderInfo.paymentOption === 'cash' ? true : false}
                        onChange={()=> setOrderInfo({...orderInfo, paymentOption: 'cash'})} />
                    <label>Pay with cash when your order arrives</label>
                </div>
                
                <div className={orderInfo.paymentOption === 'card' ? 'active' : ''}>
                    <span className='radio_circle' />
                    <input 
                        type='radio' 
                        name ='payment'
                        checked={orderInfo.paymentOption === 'card' ? true : false}
                        onChange={()=> setOrderInfo({...orderInfo, paymentOption: 'card'})} />
                    <label>Pay with a credit card</label>
                </div>
                
            </div>

            <div 
                className='card_payment'
                style={{display: orderInfo.paymentOption === 'card' ? 'flex' : 'none'}}>
                    <div className='input_div'>
                        <label>CARDHOLDER NAME:</label>
                        <input 
                            type='text'
                            id='cardholderName'
                            value={userInfo.cardholderName} 
                            maxLength='35' 
                            onChange={(e) => updateState(e.target)} />
                    </div>
                    <div className='input_div card_number'>
                        <label>CARD NUMBER:</label>
                        <input 
                            type='text'
                            id='cardNumber'
                            value={userInfo.cardNumber} 
                            minLength='19' 
                            maxLength='19' 
                            onChange={(e) => {
                                e.target.value = creditCardFormat(e.target.value);
                                updateState(e.target);
                            }} />
                    </div>

                    <div id='date_and_cvc'>
                        <div className='input_div'>
                            <label>EXPIRATION DATE (MM/YY):</label>
                            <input 
                                type='text'
                                id='cardExpiration'
                                value={userInfo.cardExpiration} 
                                minLength='5'
                                maxLength='5'
                                onChange={(e) => {
                                    if(e.target.value.length === 2 
                                    && userInfo.cardExpiration.length === 1) e.target.value += '/'
                                    updateState(e.target)}
                                } />
                        </div>

                        <div className='input_div cvc'>
                            <label>CVC:</label>
                            <input 
                                type='text'
                                id='cardCVC'
                                value={userInfo.cardCVC} 
                                minLength='3'
                                maxLength='3' 
                                onChange={(e) => updateState(e.target)} />
                         </div>
                    </div>

                </div>


            <Button 
                style={{margin: '45px 0', width: '500px'}}
                click={submitForm} 
            >ORDER NOW</Button>

            </form>

            <div>
                <h2>ORDER DETAILS:</h2>
                <div className='itemsInCart'>
                    <OrderSummary maxHeight='500px'/>
                </div>
                <p id='total'>Total: ${cartContext.total.toFixed(2)}</p>

                <h2>HAVE A COUPON?</h2>

                <div className='input_div coupon'>
                    <input 
                        type='text' />
                    <Button click={(e)=> e.target.parentElement.classList.add('invalid')}>SUBMIT</Button>
                        
                </div>
            </div>

        </Container>
    )
} 

export default Checkout;
