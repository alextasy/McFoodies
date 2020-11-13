import React, { useState, useContext } from 'react';
import './Nav.css';
import logo from '../../../images/icons/logo.png';
import phoneIcon from '../../../images/icons/phone.png';
import phoneIcon_hover from '../../../images/icons/phone_hover.png';
import cartIcon from '../../../images/icons/cart.png'
import Button from '../../regular_components/button/Button';
import {withRouter} from 'react-router-dom';
import SignInModal from '../../regular_components/sign_in_modal/SignInModal';
import {AuthContext} from '../../../context';

function Nav(props) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const phoneIconOnHover = (img) => img.src = img.src === phoneIcon ? phoneIcon_hover : phoneIcon;
    const context = useContext(AuthContext);

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

                <span onClick={()=> setIsModalOpen(true)}>{context.isAuth ? 'MY ACCOUNT' : 'SIGN IN'}</span>

                <div id='cart'>
                    <div id='number_of_items'>6</div>
                    <img src={cartIcon} alt='Cart icon' height='33'></img>
                </div>

                <Button click={() => props.history.push('/menu')}>ORDER NOW</Button>

            </section>
            {isModalOpen ? <SignInModal close={()=> setIsModalOpen(false)}/> : null}
        </nav>
    )
}

export default withRouter(Nav);
