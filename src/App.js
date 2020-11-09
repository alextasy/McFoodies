import './App.css';
import Container from './components/layout_components/container/Container';
import Nav from './components/layout_components/nav/Nav'
import Footer from './components/layout_components/footer/Footer';
import Home from './components/layout_components/home/Home';
import {Route} from 'react-router-dom';
import Menu from './components/layout_components/menu/Menu';

function App() {

  return (
    <div className="App">

      <Nav/>

      <Container>
        <Route path='/' exact component={Home}/> 
        <Route path='/menu' component={Menu}/> 
      </Container>

      <Footer/>
    </div>
  );
}

export default App;
