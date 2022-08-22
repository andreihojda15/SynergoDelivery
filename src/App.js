import './style/bootstrap.scss';

import Header from './components/layout/Header';
import Content from './components/layout/Content';
import Footer from './components/layout/Footer';

import Packages from './components/packages/Package';
import Cars from './components/cars/Cars';
import Drivers from './components/drivers/Drivers';

function App() {
  return (
    <div className="App">
      <Header />
      <Content>
        <Packages></Packages>
        <Cars></Cars>
        <Drivers></Drivers>
      </Content>
      <Footer />
    </div>
  );
}

export default App;
