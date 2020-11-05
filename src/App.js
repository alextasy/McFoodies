import './App.css';
import Container from './components/layout_components/container/Container';
import Nav from './components/layout_components/nav/Nav'
import Footer from './components/layout_components/footer/Footer';
import Home from './components/layout_components/home/Home';

function App() {

  return (
    <div className="App">

      <Nav/>

      <Container>
        <Home/>
      </Container>

      <Footer/>
    </div>
  );
}

export default App;
