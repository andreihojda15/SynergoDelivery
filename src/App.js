import logo from './logo.svg';
import './App.css';
import './style/bootstrap.scss';
import Welcome1 from './components/demo/Welcome1';
import Welcome2 from './components/demo/Welcome2';

function App() {
  const onLoad = () => {
    console.log(`loaded`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <div>
          <Welcome1 name="Sara" age={36} onLoad={onLoad}>
            <p>This is a child.</p>
          </Welcome1>
          <Welcome2 name="Michael"></Welcome2>
        </div>
      </header>
    </div>
  );
}

export default App;
