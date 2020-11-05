import React from 'react';
import images from '../../regular_components/hero/hero_images';
import './Footer.css';
import {icons, icons_hover} from './icons';

function Footer() {

    const socials = <div className='socials'>
        
        <span onMouseEnter={(e)=> e.target.src=icons_hover[0]}
              onMouseOut={(e)=> e.target.src=icons[0]}>
            <img src={icons[0]}/>
            <span>0 873 421 891</span>
        </span>

         {icons.map((icon, index)=>{
            if(index === 0) return;
            return <img src={icons[index]} 
                        onMouseEnter={(e)=> e.target.src=icons_hover[index]}
                        onMouseOut={(e)=> e.target.src=icons[index]}
                    />
         })}
    </div>

    return (
        <footer className='Footer'>

            <nav>
                <span>CONTACT US</span>
                <span>FAQ</span>
                <span>RESTAURANTS</span>
                <span>TERMS OF USE</span>
                <span>ALLERGENS</span>
                <span>DATA PROTECTION POLICY</span>
            </nav>
            {socials}
            
        </footer>
    )
}

export default Footer
