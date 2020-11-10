import React, { useState } from 'react';
import Button from '../../regular_components/button/Button';
import Container from '../container/Container';
import './SignUp.css';

function SignUp() {
    const [authInfo, setAuthInfo] = useState({email: '', password: '', repeatPassword: ''})
    const [userInfo, setUserInfo] = useState({
        name: '',
        firstLine: '',
        secondLine: '',
        city: '',
        zipCode: '',
        phoneNumber: '',
        newsletter: false,
    })
    console.log(authInfo);
    return (
        <Container class='Sign_up'>
            <form>
                <h2>SIGN IN DETAILS:</h2>

                <div className='input_div'>
                    <label>EMAIL:</label>
                    <input type='email' value={authInfo.email} ></input>
                </div>

                <div className='input_div'>
                    <label>PASSWORD:</label>
                    <input type='password' value={authInfo.password}></input>
                </div>

                <div className='input_div'>
                    <label>REPEAT PASSWORD:</label>
                    <input type='password' value={authInfo.repeatPassword}></input>
                </div>

                <h2>CONTACT DETAILS:</h2>

                <div className='input_div'>
                    <label>FULL NAME:</label>
                    <input type='text' value={userInfo.name} maxLength='15'></input>
                </div>

                <div className='input_div'>
                    <label>PHONE NUMBER:</label>
                    <input type='text' value={userInfo.phoneNumber} maxLength='15'></input>
                </div>

                
            </form>

            <form>
                 <h2>ADDRESS:</h2>

                <div className='input_div'>
                    <label>FIRST LINE OF ADDRESS:</label>
                    <input type='text' value={userInfo.firstLine}></input>
                </div>

                <div className='input_div'>
                    <label>SECOND LINE OF ADDRESS (OPTIONAL):</label>
                    <input type='text' value={userInfo.secondLine}></input>
                </div>

                <div className='input_div'>
                    <label>CITY:</label>
                    <select onChange={(e)=> console.log(e.target.value)} >
                        <option value='' disabled selected id='disabled'></option>
                        <option value='London'>London</option>
                        <option value='Manchester'>Manchester</option>
                        <option value='Swansea'>Swansea</option>
                        <option value='Bristol'>Bristol</option>
                    </select>
                </div>

                <div className='input_div'>
                    <label>ZIP/POSTAL CODE:</label>
                    <input type='text' value={userInfo.zipCode} maxLength='7'></input>
                </div>

                <div className='input_div checkbox'>
                    <input type='checkbox' value={userInfo.newsletter}></input>
                    <label>I want to sign up to McFoodie's newsletter to receive information about future products, promotions and discounts. </label>
                </div>

                <Button style={{margin: '25px auto 0', width: '200px'}}>SIGN UP</Button>

            </form>

        </Container>
    )
}

export default SignUp
