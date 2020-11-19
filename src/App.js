import './App.css';
import Nav from './components/layout_components/nav/Nav'
import Footer from './components/layout_components/footer/Footer';
import Home from './components/layout_components/home/Home';
import {Route, Switch} from 'react-router-dom';
import Menu from './components/layout_components/menu/Menu';
import SignUp from './components/layout_components/sign_up/SignUp';

function App() {

  return (
    <div className="App">

      <Nav/>
      
      <Switch>
        <Route path='/' exact component={Home}/> 
        <Route path='/menu/:category' component={Menu}/>
        <Route path='/menu' component={Menu}/>
        <Route path='/signup' exact component={SignUp}/>
        <Route path='/' component={Home}/>
      </Switch>

      <Footer/>
    </div>
  );
}

export default App;
