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
    const [isLoading, setIsloading] = useState(true);
    
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
            setIsloading(false)
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

    let data = [
        {title: 'COKE 330ML', price: 1.99, url: 'gs://mcfoodie-s.appspot.com/drinks/cola.png', description: 'Coca cola original tase 330ml'},
        {title: 'COKE ZERO 330ML', price: 1.99, url: 'gs://mcfoodie-s.appspot.com/drinks/colazero.png', description: 'Coca cola zero 330ml'},
        {title: 'COKE 1.5L', price: 2.99, url: 'gs://mcfoodie-s.appspot.com/drinks/cola_big.png', description: 'Coca cola original tase 1.5L'},
        {title: 'COKE ZERO 1.5L', price: 2.99, url: 'gs://mcfoodie-s.appspot.com/drinks/colazero_big.png', description: 'Coca cola zero 1.5L'},
        {title: 'FANTA 330ML', price: 1.99, url: 'gs://mcfoodie-s.appspot.com/drinks/fanta.png', description: 'Fanta orange 330ml'},
        {title: 'CORONA', price: 1.99, url: 'gs://mcfoodie-s.appspot.com/drinks/corona.png', description: 'Corona beer 330ml'},
        {title: 'ORANJE JUICE', price: 1.99, url: 'gs://mcfoodie-s.appspot.com/drinks/orange_juice.png', description: 'Minute maid orange juice 200ml'}
    ]

    db.collection('menu').doc('drinks').set({drinks: data})
 
   const filler = [];   //Keeps the layour symetrical in case there are less products 
        for (let index = 0; index <= 8 - items.length; index++) {
           filler.push(<span className='filler' key={index}></span>)   
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
                {filler}
            </div>
        </div>
    )
}

export default withRouter(Menu);
