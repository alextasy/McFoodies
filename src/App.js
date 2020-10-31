import './App.css';
import Container from './components/container/Container';

function App() {
  return (
    <div className="App">

      <Container>
        <h1>Rendering from inside the Container HOC</h1>

      </Container>

    </div>
  );
}

export default App;
