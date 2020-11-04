import './App.css';
import Container from './components/layout_components/container/Container';
import Nav from './components/layout_components/nav/Nav'
import Card from './components/regular_components/card/Card';
import Hero from './components/regular_components/hero/Hero';
import cardProps from './components/regular_components/card/cardProps';

function App() {
  return (
    <div className="App">

      <Nav/>
      <Container>
        <Hero/>
        <h1 style={{marginBottom: '45px'}}>EXPLORE OUR VARIETY</h1>
        <Card 
          title={cardProps.pizza.title} 
          description={cardProps.pizza.description} 
          imageSrc={cardProps.pizza.src} 
          buttonText="VIEW" />
      </Container>

    </div>
  );
}

export default App;
