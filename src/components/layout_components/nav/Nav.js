import React from 'react';
import './Nav.css';
import logo from '../../../images/icons/logo.png';
import phoneIcon from '../../../images/icons/phone.png';
import phoneIcon_hover from '../../../images/icons/phone_hover.png';
import Button from '../../regular_components/button/Button';
import {withRouter} from 'react-router-dom';

function Nav(props) {

    const phoneIconOnHover = (img) => img.src = img.src === phoneIcon ? phoneIcon_hover : phoneIcon;

    return (
        <nav className="Nav">
             <section>

                <img id='logo' src={logo} alt="Logo" onClick={() => props.history.push('/')}/>
                
                <img src={phoneIcon} alt="Phone icon"
                    onMouseEnter={(e)=>phoneIconOnHover(e.target)}
                    onMouseOut={(e)=> phoneIconOnHover(e.target)}>                     
                </img>
                <span 
                    onMouseEnter={(e)=>phoneIconOnHover(e.target.parentNode.children[1])}
                    onMouseOut={(e)=> phoneIconOnHover(e.target.parentNode.children[1])}
                >0 873 421 891</span>

                <span onClick={() => props.history.push('/menu')}>MENU</span>
                <span>SIGN IN</span>
                <Button click={() => props.history.push('/menu')}>ORDER NOW</Button>

            </section>
        </nav>
    )
}

export default withRouter(Nav);
