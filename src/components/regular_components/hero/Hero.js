import React from 'react';
import './Hero.css';
import images from './hero_images';
import shadow_overlay from '../../../images/main/Shadow.png';
import Button from '../button/Button';
import modal_info from './modal_info';

function Hero() {

    const transitionLength = 600;
    let counter = 1;
    let isTransitioning = false;

    const hero_images = <section>
        
        <img src={images[images.length -1].src} //Clone of last image to make transitions easy
             alt={images[images.length -1].alt}   
             onLoad={(e)=> onLoad(e.target.parentNode.parentNode)} 
        ></img>

        {images.map((image)=> <img src={image.src} alt={image.alt} key={image.alt}></img>)}
        
        <img src={images[0].src} alt={images[0].alt}/> {/*Clone of last image to make transitions easy*/} 

    </section>

    const indicators = <div className="indicators">

        {images.map((image, index)=> 
            <span 
                key={image.alt} 
                style={{transitionDuration: `${transitionLength}ms`, animationDuration: `${transitionLength}ms`}}
                className = {index === 0 ? 'active' : null} // First element is active at start.
                onClick={(e)=> {
                    if(counter === index + 1 || isTransitioning) return; //If the same element is clicked returns
                    slide(e.target.parentNode.parentNode, index + 1 - counter);
                }}>
            </span>)}
    </div>

    const slide = (hero, imagesToJump)=>{
        const images = [...hero.firstChild.children]; // Selects the <img> in <section>
        const indicators = [...hero.lastChild.children];
        const firstImgCloneIndex = images.length - 1;// It's the last img of the array.
        const lastImgCloneIndex = 0;
        const modal = hero.children[4];
        
        isTransitioning = true;
        indicators[counter-1].className = ''; // Previous image indicator becomes inactive
        counter += imagesToJump; // Jumps left or right number of images depending on imagesToJump value.

        modal.style.animation = `flip ${transitionLength}ms ease-in-out`;
        setTimeout(()=> updateModalText(modal), transitionLength/2);

        if(counter === firstImgCloneIndex) indicators[0].className = 'active';
        else if(counter === lastImgCloneIndex) indicators[indicators.length-1].className = 'active';
        else indicators[counter-1].className = 'active';

        images.forEach((element)=> {

            element.classList.toggle('transitioning');
            element.style.transform = `translateX(-${100*counter}%)`;

            setTimeout(()=>  {
                element.classList.toggle('transitioning');
                modal.style.animation = 'none';
                isTransitioning = false;
                if(counter === lastImgCloneIndex || counter === firstImgCloneIndex){
                    resetSlides(images, firstImgCloneIndex); 
                }
            }, transitionLength);
        });   

    }

    const resetSlides = (images, firstImgCloneIndex,) =>{
        const firstImgIndex = 1;
        const lastImgIndex = firstImgCloneIndex -1; // The clone is the last in the array, actual last is the one before it

        counter = counter === firstImgCloneIndex ? firstImgIndex : lastImgIndex;
        images.forEach((image)=> image.style.transform = `translateX(-${100*counter}%)`);
    }

    const updateModalText = (modal)=>{
        const h1 = modal.firstChild;
        const p = modal.children[1];
        const firstImgCloneIndex = images.length +1; // 2 clones are added to the array of img so last img index is lenght + 1
        const lastImgCloneIndex = 0;

        if(counter === lastImgCloneIndex)       {h1.innerHTML = modal_info.hero6.h1; p.innerHTML = modal_info.hero6.p;}
        else if(counter === firstImgCloneIndex) {h1.innerHTML = modal_info.hero1.h1; p.innerHTML = modal_info.hero1.p;}
        else {h1.innerHTML = modal_info[`hero${counter}`].h1; p.innerHTML = modal_info[`hero${counter}`].p;}
    }
    
    const onLoad = (element)=>{

        let isDown = false;
        let startX, currentPos, dragDistance;
        const images = [...element.firstChild.children];
        element.addEventListener('touchstart', (e)=> e.preventDefault()); // optimizes for mobile

        element.addEventListener('pointerdown', (e)=> {
            e.preventDefault();
            if(isTransitioning) return;

            currentPos = - element.clientWidth * counter;
            isDown = true;
            startX = e.pageX;
        });
        element.addEventListener('pointerup', ()=> {finishTransition(element, images)});
        element.addEventListener('pointerleave', ()=> finishTransition(element, images));

        element.addEventListener('pointermove', (e)=> {
            if(!isDown || isTransitioning) return;

            dragDistance = e.pageX - startX;

            if(dragDistance > 400 || dragDistance < -400) {
                finishTransition(element, images);
                return;
            }
            images.forEach((image)=> image.style.transform = `translate(${currentPos - dragDistance}px)`);
        });

        const finishTransition = (element)=>{
            if(isTransitioning) return;
            
            isDown = false;
            if(dragDistance) slide(element, dragDistance < 0 ? 1 : -1);
            dragDistance = 0;
        };
    
    }
    

    return (
        <div className="Hero" >
            
            {hero_images}
            <img src={shadow_overlay} id="shadow_overlay" alt=''/>

            <button 
                className="prevBtn" 
                onClick={(event)=> isTransitioning ? null : slide(event.target.parentNode, -1)}>
            </button>

            <button 
                className="nextBtn" 
                onClick={(event)=> isTransitioning ? null : slide(event.target.parentNode, +1)}>
            </button>

            <div className="order_modal">
                <h1>FEELING HUNGRY?</h1>
                <p>Delicous food at your doorstep in no time. High quality fresh ingredients <br/>for high quality people.</p>
                <Button style={{margin: '0 auto'}}>ORDER NOW</Button>
            </div>
            {indicators}

        </div>
    )
}

export default Hero;