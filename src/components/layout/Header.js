import React from "react";
import './HeaderStyle.css';
import { Nav } from "react-bootstrap";
import {Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";


class Header extends React.Component {

  render() {
    return (
      <>
      <Navbar bg="dark" variant="dark" className="nav">
        <Container className="con">
          <Navbar.Brand href="#home">React</Navbar.Brand>
          <Nav className="me-auto" >
            <Nav.Link className="link-packages">Packages</Nav.Link>
            <Nav.Link className="link-cars">Cars</Nav.Link>
            <Nav.Link className="link-drivers">Drivers</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      </>
    );
  }
}

export default Header;
