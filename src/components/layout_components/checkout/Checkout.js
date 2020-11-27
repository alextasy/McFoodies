import React, {useContext, useEffect, useState} from 'react';
import './Checkout.css';
import Container from '../container/Container';
import Button from '../../regular_components/button/Button';
import OrderSummary from '../../regular_components/order_summary/OrderSummary';
import { CartContext } from '../../../context/CartContext';
import { AuthContext } from '../../../context/AuthContext';
import Modal, {closeModal} from '../../regular_components/modal/Modal';
import {database as db, timeStamp } from '../../../firebase';
import {withRouter} from 'react-router-dom';

function Checkout(props) {

    const authContext = useContext(AuthContext);
    const cartContext = useContext(CartContext);
    const [time, setTime] = useState([]);

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
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(()=>{
        if(authContext.isAuth){
            
            for(const key in userInfo){
                const element = document.querySelector(`#${key}`);
                if(element) element.parentElement.classList.remove('empty', 'invalid');
            };
            setUserInfo({...userInfo, ...authContext.userInfo});
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
      
        if(cartContext.total < 7) return;

        const elementsToIgnore = orderInfo.paymentOption === 'cash' ? 
        ['cardholderName', 'cardNumber', 'cardExpiration', 'cardCVC'] : [];

        let formIsInvalid = false;

        for(const key in userInfo){
            if(userInfo[key] === ''){
                const element = document.querySelector(`#${key}`);

                if(key === 'secondLine' || elementsToIgnore.includes(key)) continue; // Ignores optional fields
                if(key === 'city') {                // 'city' is a select and doesn't use the updateState function that tracks validity
                    element.parentElement.classList.add('empty');
                    continue;
                }
                formIsInvalid = true;
                updateState(element);
            }
        };

        if(formIsInvalid) return;
        placeOrder();
    }

    const placeOrder = ()=>{
        const currentDate = new Date();
        const deliveryDate = new Date(currentDate);

        deliveryDate.setMinutes (currentDate.getMinutes() + 35);
        const arr = deliveryDate.toLocaleTimeString(deliveryDate).split(':'); // returns [Hours, Minutes ,Seconds PM]

        setTime([arr[0], arr[1]]);

        setIsModalOpen(true);

        if(authContext.isAuth){
            const itemsOrdered = cartContext.cartItems.map((item) =>{
                return { name: item.title, quantity: item.quantity }
            });
            const orderTime = `${currentDate.toLocaleTimeString()} - ${currentDate.toLocaleDateString()}`;

            db.collection('orders').doc().set({
                userId: authContext.userID,
                orderedAt : orderTime,
                orderedItems : [...itemsOrdered],
                timeStamp: timeStamp.now()
            });
              
        }
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

    const understandHandler = ()=>{
        closeModal(()=>{
            cartContext.setCartItems([]);
            props.history.push('/');
            setIsModalOpen(false);
        });
    }    

    const modal = 
        <Modal click={understandHandler}>
            
            <div className='modal_content'>
                <h1>Thank you for ordering!</h1>
                <p>Estimated delivery at:</p>
                <h1>{`${time[0]}:${time[1]}`}</h1>

                <p>Our delivery driver will get in touch with you when they arrive at your address.</p>
               

                <Button click={understandHandler}>I UNDERSTAND</Button>
            </div>
        </Modal>


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

            <div className='input_div'>
                <label>CITY:</label>
                <select 
                    value={userInfo.city}
                    id='city'
                    onChange={(e) => setUserInfo({...userInfo, city: e.target.value})}
                    onClick={(e)=> e.target.parentNode.classList.remove('empty') // If form was submited this class was added
                }>
                        <option value=''> Choose city</option>
                        <option value='New York'>London</option>
                        <option value='Brooklyn'>Manchester</option>
                        <option value='Bronx'>Swansea</option>
                        <option value='Queens'>Bristol</option>
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
                class={cartContext.total < 7 ? 'min_price' : ''}
                style={{margin: '45px 0', width: '500px'}}
                click={submitForm} 
            >{cartContext.total < 7 ? 'MINIMAL ORDER PRICE IS $7.00' : 'ORDER NOW'}</Button>

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
                {isModalOpen ? modal : null}
            </div>

          

        </Container>
    )
} 

export default withRouter(Checkout);
