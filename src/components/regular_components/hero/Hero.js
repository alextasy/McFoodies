import React from 'react';
import './Hero.css';
import img1 from '../../../images/main/1.jpg';
import img2 from '../../../images/main/2.jpg';
import img3 from '../../../images/main/3.jpg';
import img4 from '../../../images/main/4.jpg';
import img5 from '../../../images/main/5.jpg';
import img6 from '../../../images/main/6.jpg';
import shadow from '../../../images/main/Shadow.png';
import Button from '../button/Button';
import heroDescriptions from './card_descriptions';

function Hero() {

    const transitionLenght = 600;
    let counter = 1;

    const slide = (hero, direction)=>{
        const arrayOfImg = [...hero.firstChild.children]; // Selects the <img> in <section>
        const indicators = [...hero.lastChild.children];
        const firstImgCloneIndex = arrayOfImg.length - 1;// It's the last img of the array. -1 because of the clone at the start
        const lastImgCloneIndex = 0;
        const modal = hero.children[4];
        
        
        indicators.forEach((element)=>{
            element.style.transitionDuration = transitionLenght + 'ms';
            element.style.animationDuration = transitionLenght + 'ms';
        })
        indicators[counter-1].className = ''; // Previous image indicator becomes inactive

        counter += direction; // direction = +1 or -1
        modal.style.animation = `flip ${transitionLenght}ms ease-in-out ${direction === -1 ? 'alternate' : ''}`;
        setTimeout(()=> updateModalText(modal), transitionLenght/2);

        switch(counter) //Assignes the active class to the proper element
        { 
            case firstImgCloneIndex: indicators[0].className = 'active'; break;
            case lastImgCloneIndex: indicators[indicators.length-1].className = 'active'; break;
            default:indicators[counter-1].className = 'active';
        };

        arrayOfImg.forEach((element)=> {
            element.addEventListener('transitionend', ()=> {
                element.style.animation = 'none';  // Resets animation, so it can be played again;
                modal.style.animation = 'none';
                element.style.transition = 'none';
            });  

            element.style.transition = `transform ease-in-out ${transitionLenght}ms`;
            element.style.animation = `fade ${transitionLenght}ms ease-in-out`;
            element.style.transform = `translateX(-${100*counter}%)`;
        });

        if(counter === lastImgCloneIndex || counter === firstImgCloneIndex){
            setTimeout(() => resetSlides(arrayOfImg, firstImgCloneIndex, modal), transitionLenght); // Waiting for transition end
        }

    }

    const resetSlides = (arrayOfImg, firstImgCloneIndex, modal) =>{

        const firstImgIndex = 1;
        const lastImgIndex = firstImgCloneIndex -1; // The clone is the last in the array, actual last is the one before it

        let index = counter === firstImgCloneIndex ? firstImgIndex : lastImgIndex;

        arrayOfImg.forEach((element)=> {
            element.style.transition = 'none';
            element.style.transform = `translateX(-${100*index}%)`;
            modal.style.animation = 'none';
        });
        counter = index;
    }
     
    const temporaryDisableButton = (button)=>{
        button.disabled = true;
        setTimeout(()=> button.disabled = false, transitionLenght)
    }

    const updateModalText = (modal)=>{
        const h1 = modal.firstChild;
        const p = modal.children[1];

        switch(counter){
            case 0: h1.innerHTML = heroDescriptions.hero6.h1; p.innerHTML = heroDescriptions.hero6.p; break;
            case 1: h1.innerHTML = heroDescriptions.hero1.h1; p.innerHTML = heroDescriptions.hero1.p; break;
            case 2: h1.innerHTML = heroDescriptions.hero2.h1; p.innerHTML = heroDescriptions.hero2.p; break;
            case 3: h1.innerHTML = heroDescriptions.hero3.h1; p.innerHTML = heroDescriptions.hero3.p; break;
            case 4: h1.innerHTML = heroDescriptions.hero4.h1; p.innerHTML = heroDescriptions.hero4.p; break;
            case 5: h1.innerHTML = heroDescriptions.hero5.h1; p.innerHTML = heroDescriptions.hero5.p; break;
            case 6: h1.innerHTML = heroDescriptions.hero6.h1; p.innerHTML = heroDescriptions.hero6.p; break;
            case 7: h1.innerHTML = heroDescriptions.hero1.h1; p.innerHTML = heroDescriptions.hero1.p; break;   
        }     
    }
    let isDown = false;
    let startX;
    let pos;
    let difference;
    let isTransitioning = false;
    const onLoad = (element)=>{

        const images = [...element.firstChild.children]; 

        element.addEventListener('pointerdown', (e)=> {
            e.preventDefault();
            if(isTransitioning) return;
            pos = -1200 * counter
            
            isDown = true;
            startX = e.pageX;
        });
        element.addEventListener('pointerup', ()=> {
            console.log('up');
            finishTransition(element, images)
        });
        element.addEventListener('pointerleave', ()=> finishTransition(element, images));
            
        element.addEventListener('pointermove', (e)=> {
            if(!isDown || isTransitioning) return;
            difference = e.pageX - startX;

            if(difference > 400 || difference < -400) {
                finishTransition(element, images);
                return;
            }
            moveImages( images)
        });
        
    }
    const finishTransition = (element, images)=>{
        console.log(difference);
        if(isTransitioning) return;
        
        isDown = false;

        if(difference > 25) slide(element, 1);
        if(difference < -25) slide(element, -1);
        difference = 0;

        isTransitioning = true;
        setTimeout(()=> isTransitioning = false, transitionLenght)
    };

    const moveImages = ( images)=> {
        images.forEach((image)=>{
            image.style.transform = `translate(${pos - difference}px)`
        })
    }


    return (
        <div className="Hero" >
            
            <section > 
                <img src={img6} alt="Fries"/> {/*clone of last image, helps transitions smoothly*/}
                <img src={img1} alt="Pizza" onLoad={(e)=> onLoad(e.target.parentNode.parentNode)}/>
                <img src={img2} alt="Burgers"/>
                <img src={img3} alt="Pasta"/>
                <img src={img4} alt="Chicken"/>
                <img src={img5} alt="Brownies"/>
                <img src={img6} alt="Fries"/>
                <img src={img1} alt="Pizza"/>  {/*clone of first image, helps transitions smoothly*/}
            </section>
            <img src={shadow} id="Shadow"/>

            <button 
                className="prevBtn" 
                onClick={(event)=> {slide(event.target.parentNode, -1); temporaryDisableButton(event.target)}}>
            </button>

            <button 
                className="nextBtn" 
                onClick={(event)=> {slide(event.target.parentNode, +1); temporaryDisableButton(event.target)}}>
            </button>

            <div className="order_modal">
                <h1>FEELING HUNGRY?</h1>
                <p>Delicous food at your doorstep in no time. High quality fresh ingredients <br/>for high quality people.</p>
                <Button style={{margin: '0 auto'}}>ORDER NOW</Button>
            </div>

            <div className="indicators">
                <span className='active'></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            
        </div>
    )
}

export default Hero;