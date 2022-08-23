import "./style/bootstrap.scss";

import Header from "./components/layout/Header";
import Content from "./components/layout/Content";
import Footer from "./components/layout/Footer";

import Packages from "./components/packages/Package";
import Cars from "./components/cars/Cars";
import Drivers from "./components/drivers/Drivers";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header>
          <Routes>
            <Route path="/" element={<Packages />}>
              <Route path="/cars" element={<Cars />} />
              <Route path="/drivers" element={<Drivers />} />
            </Route>
          </Routes>
        </Header>
      </BrowserRouter>
      <Content>
        {/* <Packages></Packages>
        <Cars></Cars>
        <Drivers></Drivers> */}
      </Content>
      <Footer />
    </div>
  );
}

export default App;
