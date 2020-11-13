import React, {useContext, useState} from 'react';
import Button from '../button/Button';
import Modal from '../modal/Modal';
import {withRouter} from 'react-router-dom';
import {firebaseAuth, database as db} from '../../../firebase';
import {AuthContext} from '../../../context';
import './SignInModal.css';

function SignInModal(props) {

    const [emailInput, setEmailInput] = useState('demo@demo.com');
    const [passwordInput, setPasswordInput] = useState('demodemo');
    const [hasEmptyFields, setHasEmptyFields] =useState(false);
    const [error, setError] = useState(null);

    const context = useContext(AuthContext);
 
    const checkIfEmpty = (input)=>{
        const inputDiv = input.parentNode;
        if(input.value === '') {
            inputDiv.classList.add('empty');
            input.placeholder = 'This field is required!';
            setHasEmptyFields(true);
            return;
        }
        inputDiv.classList.remove('empty');
        setHasEmptyFields(false);
    }

    const signInHandler = ()=>{
        if(hasEmptyFields) return;

        firebaseAuth.signInWithEmailAndPassword(emailInput, passwordInput).then(
           (credentials)=>{
                db.collection('users').doc(credentials.user.uid).get().then(
                    (doc=>{
                        context.setUserInfo(doc.data());
                        context.setIsAuth(true);
                    })
               )}
       )
       .catch(
            (error)=>{
                setError(<p className='error'>{error.message}</p>);

            }
       )
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
                                checkIfEmpty(e.target)
                            }}/>
                    </div>
    </div>

    return (
        <div className= 'SignInModal'>
            <Modal click={props.close}> 
            
                {error ? error : inputFields}

                <div className='button_div'>
                    <Button 
                        style={{width: '262.5px', height: '36px', marginTop: '10px' }}
                        click={(e)=> {signInHandler()}}>
                        SIGN IN
                    </Button>

                    <p id='no_account'>Don't have an account yet? <span onClick={()=> {
                        (props.close)();
                        props.history.push('/signup');
                    }}> Sign up here!</span></p>

                </div>
            </Modal>
        </div>
    )
}

export default withRouter(SignInModal);
