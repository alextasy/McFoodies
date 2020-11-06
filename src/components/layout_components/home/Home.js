import React from 'react';
import Card from '../../regular_components/card/Card';
import Hero from '../../regular_components/hero/Hero';
import cardProps from '../../regular_components/card/cardProps';
import './Home.css';
import Newsletter from '../../regular_components/newsletter/Newsletter';

function Home() {

    const homePageCards =  <div className='home_page_cards'>
    
    {cardProps.map((card)=>
        <Card 
          title={card.title} 
          description={card.description} 
          imageSrc={card.src} 
          buttonText="VIEW" 
          key={card.title}
    />)}
  </div>

    return (
        <div className='Home'>
            <Hero/>
            <h1 className='main_h1'>EXPLORE OUR VARIETY</h1>
            {homePageCards}
            <h1 className='main_h1'>SUBSCRIBE TO OUR NEWSLETTER</h1>
            <Newsletter/>
        </div>
    )
}

export default Home
