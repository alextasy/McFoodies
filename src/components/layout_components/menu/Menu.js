import React, { useState, useEffect, useContext } from 'react';
import {categoryProps, categoryPropsActive} from './category_props';
import './Menu.css';
import {storage, database as db} from '../../../firebase';
import Card from '../../regular_components/card/Card';
import {withRouter} from 'react-router-dom';
import {CartContext} from '../../../context/CartContext';

function Menu(props) {

    const [currentMenu, setCurrentMenu] = useState('pizza');
    const [items, setItems] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const cartContext = useContext(CartContext);

    useEffect(()=> {
        categoryProps.forEach((category) => {
            if(category.title === props.match.params.category) setCurrentMenu(category.title);
        })
    }, [props]);

    useEffect(() => {

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
                            key={item.title} 
                            click={()=> addToCart(item, url)}/> 
                    )       
            ));
            setItems(loadedItems);
        })   
    }, [currentMenu]);

    
    const addToCart = (item, url)=>{
        const newItem = {title: item.title, imageSrc: url, price: item.price, quantity: 1};
        
        cartContext.setCartItems((currentItems)=> {
            let updatedItems = currentItems;
            let notAlreadyInCart = true;

            //Checks if we already have the item so quantity can be updated instead of adding a copy

            updatedItems.forEach((currentItem)=> { 
                if(currentItem.title === newItem.title){
                    currentItem.quantity += 1;
                    notAlreadyInCart = false;
                }
            });

            if(notAlreadyInCart) updatedItems.push(newItem);

            return [...updatedItems];
        });
    }

    const icons = categoryProps.map((imgProps, index) => 
        <div 
            className='menu_icons' 
            key={imgProps.title}
            onClick={(e)=> changeCategory(e.target.lastChild)} // This returns the span with its innerHTML = category
            //img & span have pointer events turned off to make sure there are no targeting issues
            >

            <img src={currentMenu === imgProps.title ? categoryPropsActive[index] : imgProps.src} 
                 alt={`${imgProps.title} icon`}/>
            <span className={currentMenu === imgProps.title ? 'active' : null}>{imgProps.title.toUpperCase()}</span>
        </div> 
    );

    const changeCategory = (element)=>{
        props.history.push(`/menu/${element.innerHTML.toLowerCase()}`)
    }
   
    return (
        <div className='Menu'>
            <nav>
                <section>
                    {icons}
                </section>
            </nav>

            <div className='cards_container'>
                {items}
            </div>
        </div>
    )
}

export default withRouter(Menu);
