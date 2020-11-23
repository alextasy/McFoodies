import React, { useState, useEffect, useContext } from 'react';
import {categoryProps, categoryPropsActive} from './category_props';
import './Menu.css';
import {storage, database as db} from '../../../firebase';
import Card from '../../regular_components/card/Card';
import {withRouter} from 'react-router-dom';
import {CartContext} from '../../../context/CartContext';

function Menu(props) {

    const [items, setItems] = useState(null);
    const cartContext = useContext(CartContext);
    let currentCategory = props.match.params.category;  // will be equal to pizza or burgers or etc.

    useEffect(()=> {
        let incorrectUrlParams = true;

        categoryProps.forEach((category) => {
            if(category.title === currentCategory) incorrectUrlParams = false;
        });

        if(incorrectUrlParams){                 //Protects against incorrect urls from users
            props.history.push('/menu/pizza');
            // eslint-disable-next-line
            currentCategory = 'pizza';
        }

        db.collection('menu').doc(currentCategory).get()
        .then(async (doc) =>  { 
            const loadedItems = await Promise.all(doc.data()[currentCategory].map(async(item)=> 
                await storage.refFromURL(item.url).getDownloadURL()
                    .then((url)=>
                        <Card
                            title={item.title} 
                            imageSrc={url} 
                            price={item.price} 
                            description={item.description}
                            buttonText={'ADD TO CART'}
                            key={item.title} 
                            click={(e)=> addToCart(item, url, e.target)}
                            menuItemCard='true'/> 
                    )       
            ));
            setItems(loadedItems);
        }) 
    }, [props]); //Whenever the URL changes to a different category it would mean props.history changed

    
    const addToCart = (item, url, button)=>{

        const newItem = {title: item.title, imageSrc: url, price: item.price, quantity: 1};
        
        cartContext.setCartItems((currentItems)=> {
            let updatedItems = currentItems;
            let notAlreadyInCart = true;

            //Checks if we already have the item so quantity can be updated instead of adding a copy

            for(const currentItem of updatedItems) { 
                if(currentItem.title === newItem.title && currentItem.quantity === 10) return [...currentItems];
                
                if(currentItem.title === newItem.title){
                    currentItem.quantity += 1;
                    notAlreadyInCart = false;
                }
            };

            if(notAlreadyInCart) updatedItems.unshift(newItem);

            return [...updatedItems];
        });

    }

    const navigationIcons = categoryProps.map((imgProps, index) => {

        const changeCategory = (element)=>{
            props.history.push(`/menu/${element.innerHTML.toLowerCase()}`); //Labels for navigationIcons are in caps
        }

        return (

        <div 
            className='menu_icons' 
            key={imgProps.title}
            onClick={(e)=> changeCategory(e.target.lastChild)} // This returns the span with its innerHTML = category
            //img & span have pointer events turned off to make sure there are no targeting issues
            >

            <img src={currentCategory === imgProps.title ? categoryPropsActive[index] : imgProps.src} 
                 alt={`${imgProps.title} icon`}/>
            <span className={currentCategory === imgProps.title ? 'active' : null}>{imgProps.title.toUpperCase()}</span>
        </div>)
    });

    return (
        <div className='Menu'>
            <nav>
                <section>
                    {navigationIcons}
                </section>
            </nav>

            <div className='cards_container'>
                {items}
            </div>
        </div>
    )
}

export default withRouter(Menu);
