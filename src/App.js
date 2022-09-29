import "./style/bootstrap.scss";
import "./App.css";

import Header from "./components/layout/Header";
import Content from "./components/layout/Content";
import Footer from "./components/layout/Footer";

import Packages from "./components/packages/Package";
import Cars from "./components/cars/Cars";
import Drivers from "./components/drivers/Drivers";
import Customers from "./components/customers/Customers";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./components/notFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<Navigate to="/packages" replace />} />
            <Route path="/packages/*" element={<Packages />} />
            {/* <Route path="/packages" element={<Packages />}>
                <Route path=":packageId" element={<PackageDetails />} />
              </Route> */}
            <Route path="/cars" element={<Cars />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Content>
        <Footer className="footer" />
      </div>
    </BrowserRouter>
  );
}

export default App;
