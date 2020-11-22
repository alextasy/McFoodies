import React, {useContext} from 'react';
import {CartContext} from '../../../context/CartContext';
import './OrderSummary.css';


function OrderSummary(props) {
    
    const context = useContext(CartContext);

    //Array spread since new Array(10) creates an array with no properties and map cannot be used for non-existant properties
    const quantityOptions = [...new Array(10)].map((el, index)=> 
        <option value={index+1} key={index}>{index+1}</option>
    );

    const itemsInCart = context.cartItems.map((item) =>
        
        <div className='item' key={item.title}>
            <img src={item.imageSrc} alt={item.title}/>

            <div className ='properties_section'>
                <h1>{item.title}</h1>

                <span id='quantity'>Quantity: 
                    <select 
                        defaultValue={item.quantity} 
                        onChange={(e)=> changeQuantity(item.title, +e.target.value)}> 

                            {quantityOptions}
                    </select>
                </span>     

                <span>Price: ${item.price}</span>
            </div>

            <div className ='total_section'>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <span id='remove' onClick={()=> removeItem(item)}>Remove</span>
            </div>
            
        </div>
    );

    const changeQuantity = (itemName, newQuantity) =>{
        context.setCartItems((current)=>{
            const newItems = [...current];

            for (const item of newItems){
                if(item.title === itemName) {
                    item.quantity = newQuantity; 
                    break;
                }
            }
            return newItems;
        })
    }

    const removeItem = (itemToRemove)=>{
        const itemsToStay = context.cartItems.filter((item)=>{
            return (item !== itemToRemove);
        });
        context.setCartItems(itemsToStay);
    }

    const empty = <div className='item'><p>Add items in the cart to be able to order.</p></div>

    return (
        <div className='Order_summary' style={{maxHeight: props.maxHeight}}>
            {itemsInCart.length > 0 ? itemsInCart : empty}
        </div>
    )
}

export default OrderSummary;
