import './style/bootstrap.scss';

import Header from './components/layout/Header';
import Content from './components/layout/Content';
import Footer from './components/layout/Footer';

import Packages from './components/packages/Package';
import Cars from './components/cars/Cars';

function App() {
  return (
    <div className="App">
      <Header />
      <Content name="Vlad">
        <Packages></Packages>
        <Cars></Cars>
      </Content>
      <Footer />
    </div>
  );
}

export default App;
