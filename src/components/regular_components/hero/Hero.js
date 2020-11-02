import React from 'react';
import './Hero.css';
import img1 from '../../../images/main/1.jpg';
import img2 from '../../../images/main/2.jpg';
import img3 from '../../../images/main/3.jpg';
import img4 from '../../../images/main/4.jpg';
import img5 from '../../../images/main/5.jpg';
import img6 from '../../../images/main/6.jpg';
import shadow from '../../../images/main/Shadow.png';

function Hero() {

    const transitionLenght = 600;
    let counter = 1;

    const slide = (button, direction)=>{
        
        const arrayOfImg = [...button.parentNode.firstChild.children]; // Selects the <img> in <section>
        const clickedButton = button;
        const indicators = [...button.parentNode.lastChild.children];
        const firstImgCloneIndex = arrayOfImg.length - 1;// It's the last img of the array. -1 because of the clone at the start
        const lastImgCloneIndex = 0;
        
        
        indicators.forEach((element)=>{
            element.style.transitionDuration = transitionLenght + 'ms';
            element.style.animationDuration = transitionLenght + 'ms';
        })
        
        indicators[counter-1].className = '';
        counter += direction; // direction = +1 or -1

        switch(counter){
            case firstImgCloneIndex: indicators[0].className = 'active'; break;
            case lastImgCloneIndex: indicators[indicators.length-1].className = 'active'; break;
            default:indicators[counter-1].className = 'active';
        }

        arrayOfImg.forEach((element)=> {
            element.addEventListener('transitionend', ()=> {element.style.animation = 'none'}); // Resets animation, so it can be played again; 

            element.style.transition = `transform ease-in-out ${transitionLenght}ms`;
            element.style.animation = `slide ${transitionLenght}ms`;
            element.style.transform = `translateX(-${100*counter}%)`;
        });

        if(counter === lastImgCloneIndex || counter === firstImgCloneIndex){
            setTimeout(() => resetSlides(arrayOfImg, firstImgCloneIndex, clickedButton) , transitionLenght); // Waiting for transition end
        }

    }

    const resetSlides = (arrayOfImg, firstImgCloneIndex, clickedButton) =>{

        const firstImgIndex = 1;
        const lastImgIndex = firstImgCloneIndex -1; // The clone is the last in the array, actual last is the one before it

        let index = counter === firstImgCloneIndex ? firstImgIndex : lastImgIndex;

        arrayOfImg.forEach((element)=> {
            element.style.transition = 'none';
            element.style.transform = `translateX(-${100*index}%)`;
        });
        counter = index;
    }
     
    const temporaryDisableButton = (button)=>{
        console.log(button);
        button.disabled = true;
        setTimeout(()=> button.disabled = false, transitionLenght)
    }


    return (
        <div className="Hero">
            
            <section> 
                <img src={img6} alt="Fries"/> {/*clone of last image, helps transitions smoothly*/}
                <img src={img1} alt="Pizza"/>
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
                onClick={(event)=> {slide(event.target, -1); temporaryDisableButton(event.target)}}>
            </button>

            <button 
                className="nextBtn" 
                onClick={(event)=> {slide(event.target, +1); temporaryDisableButton(event.target)}}>
            </button>

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