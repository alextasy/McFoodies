import React from 'react';
import './Modal.css';
import logo from '../../../images/icons/logo.png';

export const closeModal = (closeFunction)=>{

            const modalOverlay = document.querySelector('.modal_overlay');
            const modalContainer = document.querySelector('.modal_container');

            modalOverlay.style.pointerEvents = 'none'; //Prevents from reseting the funciton when being clicked.
            
            modalOverlay.style.animation = 'none';
            modalContainer.style.animation = 'none';

            //Using timer to reset animations because strangely enough there is no good way to do that.

            setTimeout(()=> {
            modalOverlay.style.animation = 'fade_in 500ms ease-out alternate-reverse forwards';
            modalContainer.style.animation = 'slide 500ms ease-out alternate-reverse forwards';
            }, 100);

            //Removes the element from the DOM
            modalOverlay.addEventListener(
                'animationend',  closeFunction);
}


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

export default Modal;
