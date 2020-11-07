import React from 'react';
import './Modal.css';
import logo from '../../../images/icons/logo.png';

function Modal(props) {
    return (
        <div className='Modal'>
            <div className='modal_overlay' onClick={props.click}></div>
            <div className={'modal_container'}>
                <img src={logo} alt='logo'/>
                {props.children}
            </div>
        </div>
    )
}

export default Modal
