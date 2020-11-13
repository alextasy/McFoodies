import React, {useContext, useEffect, useState} from 'react';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import {withRouter} from 'react-router-dom';
import {firebaseAuth, database as db} from '../../../firebase';
import {AuthContext} from '../../../Context/AuthContext';
import Spinner from '../spinner/Spinner';
import './SignInModal.css';

function SignInModal(props) {

    const [emailInput, setEmailInput] = useState('demo@demo.com');
    const [passwordInput, setPasswordInput] = useState('demodemo');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const context = useContext(AuthContext);

    
 
    const checkIfEmpty = (input)=>{
        const inputDiv = input.parentNode;

        if(input.value === '') {
            inputDiv.classList.add('empty');
            input.placeholder = 'This field is required!';
            return;
        }
        inputDiv.classList.remove('empty');
    }

    const signInHandler = ()=>{
        if(!emailInput || !passwordInput) return;
        setIsLoading(true);
        setError(null);

        firebaseAuth.signInWithEmailAndPassword(emailInput, passwordInput).then(
           (credentials)=>{
                db.collection('users').doc(credentials.user.uid).get().then(
                    (doc=>{
                        context.setUserInfo(doc.data());
                        context.setIsAuth(true);
                        closeModal();
                    })
               )}
       )
       .catch(
            (error)=>{
                setIsLoading(false);
                setError(error.message);
            }
       )
    }

    const closeModal = ()=>{
        const modalOverlay = document.querySelector('.modal_overlay');
        const modalContainer = document.querySelector('.modal_container');

        modalOverlay.style.animation = 'none';
        modalContainer.style.animation = 'none';

        //Using timer to reset animations because strangely enough there is no good way to do that.

        setTimeout(()=> {
        modalOverlay.style.animation = 'fade_in 300ms ease-out alternate-reverse forwards';
        modalContainer.style.animation = 'slide 500ms ease-out alternate-reverse forwards';
        }, 100);

        //Removes the element from the DOM
        modalOverlay.addEventListener('animationend', props.close);

    }

    const inputFields =
        <div id='inputs_container'>
            <div className='input_div'>
                <label>EMAIL:</label>
                <input 
                    type='email'
                    value={emailInput} 
                    onChange={(e)=> {
                        setEmailInput(e.target.value);
                        checkIfEmpty(e.target)
                }}/>
            </div>
            
            <div className='input_div'>
                <label>PASSWORD:</label>
                <input 
                    type='password' 
                    value={passwordInput} 
                    onChange={(e)=> {
                        setPasswordInput(e.target.value);
                        checkIfEmpty(e.target);
                    }}/>
            </div>
     </div>

    return (
        <div className= 'SignInModal'>
            <Modal click={closeModal}> 
            
                {isLoading ? <Spinner small={true}/> : inputFields}
                <div className='error'>{error}</div>

                <div className='button_div'>
                    <Button 
                        style={{width: '262.5px', height: '36px', marginTop: '10px' }}
                        click={()=> {signInHandler()}}
                        >SIGN IN
                    </Button>

                    <p id='no_account'>Don't have an account yet? <span onClick={()=> {
                        closeModal();
                        props.history.push('/signup');
                    }}> Sign up here!</span></p>

                </div>
            </Modal>
        </div>
    )
}

export default withRouter(SignInModal);
