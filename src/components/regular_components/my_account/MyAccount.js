import React, { useEffect, useContext, useState } from 'react';
import Modal, {closeModal} from '../modal/Modal';
import Button from '../button/Button';
import { AuthContext } from '../../../context/AuthContext';
import {firebaseAuth, database as db} from '../../../firebase';
import './MyAccount.css';



function MyAccount() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [active, setActive] = useState('about_me');
    const context = useContext(AuthContext);
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        db.collection('orders').doc(context.userID).get()
            .then((doc)=>{
                console.log(doc.data());
            })
        
    }, [])


    const symbolX = <div id='x' onClick={()=> closeModal(()=>setIsModalOpen(false))}></div>

    const aboutMe = active !== 'about_me' ? null :

        <div className='about_me_div'>
            <div>
                <h2>CONTACT DETAILS:</h2>
                <div className='info'>
                    <label>EMAIL:</label> 
                    <div>{context.userInfo.email}</div> 
                </div>
                <div className='info'>
                    <label>FULL NAME: </label> 
                    <div>{context.userInfo.name}</div> 
                </div>
                <div className='info'>
                    <label>PHONE NUMBER: </label>
                    <div>{context.userInfo.phoneNumber}</div>
                </div>
            </div>

            <div>
                <h2>ADDRESS DETAILS:</h2>
                <div className='info'>
                    <label>FIRST LINE OF ADDRESS:</label> 
                    <div>{context.userInfo.firstLine}</div> 
                </div>
                <div className='info'>
                    <label>SECOND LINE OF ADDRESS: </label> 
                    <div>{context.userInfo.secondLine}</div> 
                </div>
                <div className='info'>
                    <label>CITY: </label>
                    <div>{context.userInfo.city}</div>
                </div>
                <div className='info'>
                    <label>ZIP/POSTAL CODE: </label>
                    <div>{context.userInfo.zipCode}</div>
                </div>
            </div>

        </div>
    
    const myOrders = active !== 'my_orders' ? null :

        <div className='my_orders_div'>
            {orders ? orders : <div style={{color: '#666666'}}> You don't have any orders yet. </div>}
        </div>

    const discountCodes = active !== 'discount_codes' ? null :

        <div style={{color: '#666666'}}>
            You don't have any discount codes currently.
        </div>

    const signOut = ()=>{
        firebaseAuth.signOut()

        //When isAuth = false, the component gets unmouted
        //the closeModal function play the param funcion after the modal close animation has ended
        closeModal(()=> {
            context.setIsAuth(false);
            context.setUserInfo(null);
            context.setUserID(null);
        });
        
    }

    const navs = 
        <div className='navs'>
            <span 
                id='about_me' 
                className ={active === 'about_me' ? 'active' :null}
                onClick={(e)=> setActive(e.target.id)}
                >ABOUT ME</span>
            <span 
                id='my_orders'
                className ={active === 'my_orders' ? 'active' :null}
                onClick={(e)=> setActive(e.target.id)}
                >MY ORDERS</span>
            <span 
                id='discount_codes'
                className ={active === 'discount_codes' ? 'active' :null}
                onClick={(e)=> setActive(e.target.id)}
                >DISCOUNT CODES</span>

            <Button click={signOut} >SIGN OUT</Button>
        </div>
   
    const myAccountModal = 
        <Modal click={()=> closeModal(()=> setIsModalOpen(false))}>
            {symbolX}
            {aboutMe || myOrders || discountCodes}
            {navs}
        </Modal>


    return (
        <div className='MyAccount'>
           <span onClick={()=> setIsModalOpen(true)}>MY ACCOUNT</span> 
            {isModalOpen ? myAccountModal : null}
        </div>
    )
}

export default MyAccount;
