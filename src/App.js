import logo from './logo.svg';
import './App.css';
//import Welcome1 from './components/demo/Welcome1';
//import Welcome2 from './components/demo/Welcome2';
import Header from './components/layout/Header';
import Content from './components/layout/Content';
import Footer from './components/layout/Footer';


function App() {
  /*
  const onLoad = () => {
    console.log(`loaded`);
  }
*/
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
          <Header></Header>
          <Content name="Vlad"></Content>
          <Footer></Footer>
        </div>
      </header>
    </div>
  );
}

export default App;

/*
<div>
  <Welcome1 name="Sara" age={36} onLoad={onLoad}>
    <p>This is a child.</p>
    </Welcome1>
  <Welcome2 name="Michael"></Welcome2>
</div>
*/