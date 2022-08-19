import './style/bootstrap.scss';

import Header from './components/layout/Header';
import Content from './components/layout/Content';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Content name="Vlad"></Content>
      <Footer />
    </div>
  );
}

export default App;
