import React from "react";
import "./HeaderStyle.css";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" className="nav">
          <Container className="con">
            <Image
              src={require("../../assets/images/box.png")}
              alt="header logo"
              className="logo"
            />
            <div className="linkContainer">

              <Link className="link" to="/packages" >
                Packages
              </Link>
              <Link className="link" to="/cars" >
                Cars
              </Link>
              <Link className="link" to="/drivers" >
                Drivers
              </Link>
            </div>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Header;
