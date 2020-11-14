import React, { useState } from 'react';
import Modal, {closeModal} from '../modal/Modal';
import Button from '../button/Button';
import './MyAccount.css';


function MyAccount() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [active, setActive] = useState('about_me');


    const symbolX = <div id='x' onClick={()=> closeModal(()=>setIsModalOpen(false))}></div>

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

            <Button>SIGN OUT</Button>
        </div>
   
    const myAccountModal = 
        <Modal click={()=> closeModal(()=> setIsModalOpen(false))}>
            {symbolX}
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
