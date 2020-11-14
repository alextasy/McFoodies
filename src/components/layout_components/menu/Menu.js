import React, { useState, useEffect } from 'react';
import {menuIcons, menuIconsActive} from './menu_icons';
import './Menu.css';
import {storage, database as db} from '../../../firebase';
import Card from '../../regular_components/card/Card';
import Spinner from '../../regular_components/spinner/Spinner';
import {withRouter} from 'react-router-dom';

function Menu() {

    const [currentMenu, setCurrentMenu] = useState('pizza');
    const [items, setItems] = useState([]);
    const [isLoading, setIsloading] = useState(false);
    
    useEffect(() => {
        setIsloading(true);
        db.collection('menu').doc(currentMenu).get()
        .then(async (doc) =>  { 
            const loadedItems = await Promise.all(doc.data()[currentMenu].map(async(item)=> 
                await storage.refFromURL(item.url).getDownloadURL()
                    .then((url)=>
                        <Card
                            title={item.title} 
                            imageSrc={url} 
                            price={item.price} 
                            description={item.description}
                            buttonText={'ADD TO CART'}
                            key={item.title} />
                            
                    )       
            ));
        setIsloading(false);
            setItems(loadedItems);
        })
        
    }, [currentMenu]);

    const icons = menuIcons.map((imgProps, index) => 
        <div 
            className='menu_icons' 
            key={imgProps.title}
            onClick={(e)=> changeCategory(e.target.lastChild)} // This returns the span with its innerHTML = category
            //img & span have pointer events turned off to make sure there are no targeting issues
            >

            <img src={currentMenu === imgProps.title ? menuIconsActive[index] : imgProps.src} 
                 alt={`${imgProps.title} icon`}/>
            <span className={currentMenu === imgProps.title ? 'active' : null}>{imgProps.title.toUpperCase()}</span>
        </div> 
    );

    const changeCategory = (element)=>{
        setCurrentMenu(element.innerHTML.toLowerCase())
    }
   
    return (
        <div className='Menu'>
            <nav>
                <section>
                    {icons}
                </section>
            </nav>

            <div className='cards_container'>
                {isLoading ? <Spinner/> : items}
            </div>
        </div>
    )
}

export default withRouter(Menu);
