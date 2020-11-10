import React from 'react';
import Button from '../../regular_components/button/Button';
import Container from '../container/Container';
import './SignUp.css';

class SignUp extends React.Component {


    state = {
            auth: {
                email: '', 
                password: '',
                repeatPassword: ''
            },
            address: {
                firstLine: '',
                secondLine: '',
                city: '',
                zipCode: '',
                phoneNumber: '',
                newsletter: false
            }
    }       

    render() {
        
        console.log(this.state);
        return(
        <Container class='Sign_up'>
            <form>
                <h2>Sign in details:</h2>

                <div className='input_div'>
                    <label>Email:</label>
                    <input type='email' value={this.state.auth.email} onChange={(e)=> this.setState({auth: {email: e.target.value}})}></input>
                </div>

                <div className='input_div'>
                    <label>Password:</label>
                    <input type='password' value={this.state.auth.password}></input>
                </div>

                <div className='input_div'>
                    <label>Repeat password:</label>
                    <input type='password' value={this.state.auth.repeatPassword}></input>
                </div>

                <h2>Address:</h2>

                <div className='input_div'>
                    <label>First line of address:</label>
                    <input type='text' value={this.state.address.firstLine}></input>
                </div>

                <div className='input_div'>
                    <label>Second line of address(optional):</label>
                    <input type='text' value={this.state.address.secondLine}></input>
                </div>

                <div className='input_div'>
                    <label>City:</label>
                    <select onChange={(e)=> console.log(e.target.value)} >
                        <option value='' disabled selected id='disabled'></option>
                        <option value='London'>London</option>
                        <option value='Manchester'>Manchester</option>
                        <option value='Swansea'>Swansea</option>
                        <option value='Bristol'>Bristol</option>
                    </select>
                </div>

                <div className='input_div'>
                    <label>ZIP/Postal code:</label>
                    <input type='text' value={this.state.address.zipCode} maxLength='7'></input>
                </div>

                <h2>Contact details:</h2>

                <div className='input_div'>
                    <label>Phone number:</label>
                    <input type='text' value={this.state.address.phoneNumber} maxLength='15'></input>
                </div>

                <div className='input_div checkbox'>
                    <input type='checkbox' value={this.state.address.newsletter}></input>
                    <label>I want to sign up to McFoodie's newsletter</label>
                </div>

                <Button style={{margin: '25px 0 45px'}}>SIGN UP</Button>
                
            </form>
        </Container>
    )}
}

export default SignUp
