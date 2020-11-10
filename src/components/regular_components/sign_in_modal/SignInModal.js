import React, {useState} from 'react';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import {withRouter} from 'react-router-dom';
import './SignInModal.css';

function SignInModal(props) {

    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
 
    const checkIfEmpty = (input)=>{
        const inputDiv = input.parentNode;
        if(input.value === '') {
            inputDiv.classList.add('empty');
            input.placeholder = 'This field is required!';
            return;
        }
        inputDiv.classList.remove('empty');
    }

    const signInHandler = (el)=>{
        // el.style.animationName = 'trans'
        // setTimeout(()=> el.style.animationName = '', 2000)
    }

    return (
        <div className= 'SignInModal'>
            <Modal click={props.close}> 
                <div className='input_div'>
                    <label>Email:</label>
                    <input 
                        type='email'
                        value={emailInput} 
                        onChange={(e)=> {
                            setEmailInput(e.target.value);
                            checkIfEmpty(e.target)
                    }}/>
                </div>
                
                <div className='input_div'>
                    <label>Password:</label>
                    <input 
                        type='password' 
                        value={passwordInput} 
                        onChange={(e)=> {
                            setPasswordInput(e.target.value);
                            checkIfEmpty(e.target)
                        }}/>
                </div>

                <div className='button_div'>
                    <Button 
                        style={{width: '120px', height: '36px'}}
                        click={(e)=> signInHandler(e.target.parentNode.parentNode.lastChild)}>
                        SIGN IN
                    </Button>

                    <p>Don't have an account yet? <span onClick={()=> props.history.push('/signup')}> Sign up here!</span></p>

                </div>
                <div className='animate'></div>
            </Modal>
        </div>
    )
}

export default withRouter(SignInModal);
