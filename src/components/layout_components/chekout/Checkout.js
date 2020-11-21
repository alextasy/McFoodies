import React, {useContext, useState} from 'react';
import './Checkout.css';
import Container from '../container/Container';
import {CartContext} from '../../../context/CartContext';
import Button from '../../regular_components/button/Button';

function Checkout() {

    const [userInfo, setUserInfo] = useState({
        name: '',
        firstLine: '',
        secondLine: '',
        city: '',
        zipCode: '',
        phoneNumber: '',

    });

    const [orderInfo, setOrderInfo] = useState({
        notes: ''
    })
    
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


    const context = useContext(CartContext);
    let total = 0;


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

    return (
        <Container class='Checkout'>

            <form>

            <div className='input_div' id='notes_div'>
                <h2>LEAVE A NOTE:</h2>
                <textarea 
                    id='notes'
                    placeholder='Leave us a note(eg. no onions, deliver at the back door...)'
                    value={orderInfo.notes} maxLength='250'  
                    onChange={(e) => setOrderInfo({...orderInfo, notes: e.target.value})} />
            </div>

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

            <Button 
                style={{margin: '25px 0', width: '500px'}}
                
            >SIGN UP</Button>

            </form>

            <div>
                <h2>ORDER DETAILS:</h2>
                <div className='itemsInCart'>
                    {itemsInCart}
                </div>
                <p id='total'>Total: ${total.toFixed(2)}</p>
            </div>

        </Container>
    )
} 

export default Checkout;
