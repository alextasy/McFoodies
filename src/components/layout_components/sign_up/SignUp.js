import React, { useContext, useEffect, useState } from 'react';
import Button from '../../regular_components/button/Button';
import Container from '../container/Container';
import './SignUp.css';
import {firebaseAuth, database as db} from '../../../firebase';
import Modal, {closeModal} from '../../regular_components/modal/Modal';
import Spinner from '../../regular_components/spinner/Spinner';
import {withRouter} from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

function SignUp(props) {

    const [userInfo, setUserInfo] = useState({
        email: '', 
        password: '', 
        repeatPassword: '',
        name: '',
        firstLine: '',
        secondLine: '',
        city: '',
        zipCode: '',
        phoneNumber: '',
        newsletter: false,
    });
    const [signUpMessage, setSignUpMessage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const authContext = useContext(AuthContext);

    //Acurately tracks if passwords match and updates based on that

    useEffect(()=>{ 
        if(userInfo.password === userInfo.repeatPassword) {
            document.querySelector('#repeatPassword').parentNode.classList.remove('invalid_password');
            return; 
        }
    }, [userInfo.password, userInfo.repeatPassword]);

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

    const submitForm = ()=>{
        const emailRegexPattern = /^[a-z,0-9][a-z, 0-9,.,_]+@[a-z,.,_]+\.[a-z]{2,4}$/i;
        let formIsInvalid = false;

        Object.keys(userInfo).forEach((key)=>{
            if(userInfo[key] === ''){
                const element = document.querySelector(`#${key}`);

                if(key === 'secondLine') return;    // Second line of address is otional, so no validity check for it
                if(key === 'city') {                // 'city' is a select and doesn't use the updateState function that tracks validity
                    element.classList.add('empty');
                    return;
                }
                formIsInvalid = true;
                updateState(element);
            }
        });

        if(!emailRegexPattern.test(userInfo.email)){
            document.querySelector('#email').parentNode.classList.add('invalid_email');
            formIsInvalid = true;
        }
        if(userInfo.password !== userInfo.repeatPassword) formIsInvalid = true;

        if(formIsInvalid) return;
        signUpUser();
    }

    const signUpUser = ()=>{

        // Removes passwords that shouldn't be stored
        const noPassword = ({password, repeatPassword, ...rest}) => rest;
        const newInfo = noPassword(userInfo); 

        setIsModalOpen(true);

        firebaseAuth.createUserWithEmailAndPassword(userInfo.email, userInfo.password)
            .then((credentials)=>{
                const userId = credentials.user.uid;
                
                //Creates a user doc matching the Auth UID

                db.collection('users').doc(userId).set( {
                    ...newInfo
                })


                //Changes the global state/context to be auth
               
                authContext.setUserInfo({...newInfo});
                authContext.setUserID(userId);
                authContext.setIsAuth(true);
                   
                setIsSuccessful(true);
                setSignUpMessage('Thank you for signing up. Enjoy our delicious food!');

                //Newsletter emails are stored in a different db so non-account users can be subbscribed
                if(userInfo.newsletter) {
                    db.collection('newsletter_users').doc(userInfo.email).set({
                        isSigned: true
                    });
                }
            })
            .catch((err)=> setSignUpMessage(err.message));
    }

    const closeOrRedirect = ()=> {
        if(isSuccessful) props.history.push('/menu');
        closeModal(()=> setIsModalOpen(false));
    }
    
    const signUpModal = 
        <Modal click={closeOrRedirect}>
            {signUpMessage ? <p>{signUpMessage}</p> : <Spinner small={true}/>}

            <Button click={closeOrRedirect}>CLOSE</Button>
        </Modal>
 

    return (
        <Container class='Sign_up'>
            <form>
                <h2>SIGN IN DETAILS:</h2>

                <div className='input_div'>
                    <label>EMAIL:</label>
                    <input 
                        type='email' 
                        id='email' 
                        value={userInfo.email}
                        maxLength='25' 
                        onChange={(e) => {
                            updateState(e.target);
                            e.target.parentNode.classList.remove('invalid_email'); //resets if form was submited with invalid class
                        }}
                    />
                </div>

                <div className='input_div'>
                    <label>PASSWORD:</label>
                    <input 
                        type='password'
                        id='password' 
                        value={userInfo.password}
                        minLength='7' 
                        maxLength='25' 
                        onChange={(e) => updateState(e.target)} 
                    />
                </div>

                <div className='input_div'>
                    <label>REPEAT PASSWORD:</label>
                    <input 
                        type='password'
                        id='repeatPassword' 
                        value={userInfo.repeatPassword} 
                        maxLength='25' 
                        onChange={(e) => {
                            updateState(e.target);
                            e.target.parentNode.classList.add('invalid_password');  
                        }} />
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

                
            </form>

            <form>
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
                            <option value='New York'>London</option>
                            <option value='Brooklyn'>Manchester</option>
                            <option value='Bronx'>Swansea</option>
                            <option value='Queens'>Bristol</option>
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

                <Button click={submitForm}>SIGN UP</Button>

            </form>
            {isModalOpen ? signUpModal : null}
        </Container>
    )
}

export default withRouter(SignUp);
