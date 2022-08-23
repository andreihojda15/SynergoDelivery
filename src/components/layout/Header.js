import React from "react";
import "./HeaderStyle.css";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" className="nav">
          <Container className="con">
            <Navbar.Brand href="#home">React</Navbar.Brand>
            <Nav className="me-auto">
              <Link to="/">Packages</Link>
              <Link to="/cars">Cars</Link>
              <Link to="/drivers">Drivers</Link>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Header;
