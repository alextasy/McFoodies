import './App.css';
import Container from './components/layout_components/container/Container';
import Nav from './components/layout_components/nav/Nav'
import Hero from './components/regular_components/hero/Hero';

function App() {
  return (
    <div className="App">

      <Nav/>
      <Container>
        <Hero/>
        <span>Explore</span>

      </Container>

    </div>
  );
}

export default App;
