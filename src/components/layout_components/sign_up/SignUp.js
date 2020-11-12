import React, { useEffect, useState } from 'react';
import Button from '../../regular_components/button/Button';
import Container from '../container/Container';
import './SignUp.css';
import {firebaseAuth, database as db} from '../../../firebase';
import Modal from '../../regular_components/modal/Modal';
import Spinner from '../../regular_components/spinner/Spinner';
import {withRouter} from 'react-router-dom';

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

                if(key === 'secondLine') return;
                if(key === 'city') {
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
        setIsModalOpen(true);

        firebaseAuth.createUserWithEmailAndPassword(userInfo.email, userInfo.password)
            .then((credentials)=>{
                console.log(credentials);
                const userId = credentials.user.uid;

                db.collection('users').doc(userId).set( {
                    email: userInfo.email,
                    name: userInfo.name,
                    firstLine: userInfo.firstLine,
                    secondLine: userInfo.secondLine,
                    city: userInfo.city,
                    zipCode: userInfo.zipCode,
                    phoneNumber: userInfo.phoneNumber,
                    newsletter: false,
                })
                setSignUpMessage('Thank you for signing up. Enjoy our delicious food!');
                setIsSuccessful(true);
            })
            .catch((err)=> {
                setSignUpMessage(err.message);
            });
    }
    

    const signUpModal = 
        <Modal click={()=>{
            if(isSuccessful) props.history.push('/menu');
            setIsModalOpen(false);
        }}>
            {signUpMessage ? <p>{signUpMessage}</p> : <Spinner small={true}/>}
            <Button click={()=> 
                {
                    if(isSuccessful) props.history.push('/menu');
                    setIsModalOpen(false);
                }}
            >CLOSE</Button>
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
                        onChange={(e) => {setUserInfo({...userInfo, city: e.target.value});}}
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
                    click={()=> submitForm()}
                >SIGN UP</Button>

            </form>
            {isModalOpen ? signUpModal : null}
        </Container>
    )
}

export default withRouter(SignUp);
