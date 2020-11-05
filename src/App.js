import './App.css';
import Container from './components/layout_components/container/Container';
import Nav from './components/layout_components/nav/Nav'
import Card from './components/regular_components/card/Card';
import Hero from './components/regular_components/hero/Hero';
import cardProps from './components/regular_components/card/cardProps';

function App() {

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
    <div className="App">

      <Nav/>
      <Container>
        <Hero/>
        <h1 className='main_h1'>EXPLORE OUR VARIETY</h1>
        {homePageCards}
        <h1 className='main_h1'>SIGN UP FOR OUR NEWSLETTER</h1>

      </Container>

    </div>
  );
}

export default App;
