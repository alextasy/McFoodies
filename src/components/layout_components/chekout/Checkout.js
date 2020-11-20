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

            <h2>ADDRESS:</h2>

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

            <div className='input_div checkbox'>
                <input 
                    type='checkbox'
                    id='newsletter' 
                    value={userInfo.newsletter} 
                    onChange={(e) => setUserInfo({...userInfo, newsletter: e.target.checked})} />
                <label>I want to sign up to McFoodie's newsletter to receive information about future products, promotions and discounts. </label>
            </div>

            <Button 
                style={{margin: '25px auto 0', width: '500px'}}
                
            >SIGN UP</Button>
           
        </Container>
    )
} 

export default Checkout;
