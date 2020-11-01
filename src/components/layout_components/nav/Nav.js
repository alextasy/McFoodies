import React from 'react';
import './Nav.css';
import logo from '../../../images/icons/logo.svg';
import phoneIcon from '../../../images/icons/phone.png';

function Nav() {
    return (
        <div className="Nav">
             <section>

                <img id='logo' src={logo} alt="Logo"></img>
                
                
                <img src={phoneIcon} alt="Phone icon"></img>
                <span>0 873 421 891</span>

                <span>MENU</span>
                <span>SIGN IN</span>
                <button>ORDER NOW</button>

            </section>
        </div>
    )
}

export default Nav
