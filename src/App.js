import './App.css';
import Container from './components/container/Container';
import Nav from './components/nav/Nav';

function App() {
  return (
    <div className="App">

      <Nav/>
      <Container>
        <h1>Rendering from inside the Container HOC</h1>

      </Container>

    </div>
  );
}

export default App;
