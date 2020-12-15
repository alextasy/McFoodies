import React, { useState, useContext} from 'react';
import './Nav.css';
import logo from '../../../images/icons/logo.png';
import phoneIcon from '../../../images/icons/phone.png';
import phoneIcon_hover from '../../../images/icons/phone_hover.png';
import Button from '../../regular_components/button/Button';
import {withRouter} from 'react-router-dom';
import SignInModal from '../../regular_components/sign_in_modal/SignInModal';
import {AuthContext} from '../../../context/AuthContext';
import MyAccount from '../../regular_components/my_account/MyAccount';
import Cart from '../../regular_components/cart/Cart';

function Nav(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const phoneIconOnHover = (img) => img.src = img.src === phoneIcon ? phoneIcon_hover : phoneIcon;
    const authContext = useContext(AuthContext);

    const isSignedIn = authContext.isAuth ?
        <MyAccount/> : <span onClick={()=> setIsModalOpen(true)}>SIGN IN</span>

    const menuSpan = <span onClick={() => {
            props.history.push('/menu');
            setIsHamburgerOpen(false);
        }}>MENU</span>


    const hamburgerMenu = 
        <div className={`hamburger_menu ${isHamburgerOpen ? 'active' : null}`}>

            <div 
                id='overlay' 
                className={isHamburgerOpen ? 'active' : null}
                onClick={()=> setIsHamburgerOpen(false)}></div>

            <div id='menu_links' className={isHamburgerOpen ? 'active' : null}>
                <section>
                    {isSignedIn}
                    {menuSpan}
                    <Button click={() => {
                        props.history.push('/checkout');
                        setIsHamburgerOpen(false);
                    }}>CHECKOUT</Button>
                    <span id='hamburger_phone'>0 873 421 891</span>
                </section>
            </div>
        </div>

    return (
        <>
        {hamburgerMenu}

        <nav className="Nav">
             <section>

                <div id='hamburger_menu_icon' onClick={()=> setIsHamburgerOpen(!isHamburgerOpen)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <img id='logo' src={logo} alt="Logo" onClick={() => {
                        props.history.push('/');
                        setIsHamburgerOpen(false);
                    }}/>
                
                <img src={phoneIcon} alt="Phone icon" id='phone_icon'
                    onMouseEnter={(e)=>phoneIconOnHover(e.target)}
                    onMouseOut={(e)=> phoneIconOnHover(e.target)}>                     
                </img>
                <span id='phone_span'
                    onMouseEnter={(e)=>phoneIconOnHover(e.target.parentNode.children[1])}
                    onMouseOut={(e)=> phoneIconOnHover(e.target.parentNode.children[1])}
                >0 873 421 891</span>

                {menuSpan}

                {isSignedIn}

                <Cart/>

                <Button class='order_button' click={() => {
                    if(props.location.pathname === '/' 
                    || props.location.pathname === '/signup') props.history.push('/menu');
                    else props.history.push('/checkout');

                }}>{props.location.pathname === '/' || props.location.pathname === '/signup' ? 'ORDER NOW' : 'CHECKOUT'}</Button>

            </section>
            {isModalOpen ? <SignInModal close={()=> setIsModalOpen(false)}/> : null}

        </nav>
        </>
    )
}

export default withRouter(Nav);
