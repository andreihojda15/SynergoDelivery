import React from "react";
import "./HeaderStyle.css";
import { Nav } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AddPackage from "../modal/AddPackage";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      package: true,
    };
  }

  handleClick = () => {
    this.setState({ show: !this.state.show });
  };

  notPackage = () => {
    this.setState({
      package: false,
    });
  };

  onPackage = () => {
    this.setState({
      package: true,
    });
  };

  show = () => this.state.show;

  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" className="nav">
          <Container className="con">
            <Nav className="me-auto">
              <Link className="link" to="/packages" onClick={this.onPackage}>
                Packages
              </Link>
              <Link className="link" to="/cars" onClick={this.notPackage}>
                Cars
              </Link>
              <Link className="link" to="/drivers" onClick={this.notPackage}>
                Drivers
              </Link>
            </Nav>
          </Container>

          {this.state.package ? (
            <>
              <Button variant="success" onClick={this.handleClick}>
                Add
              </Button>
              <AddPackage show={this.show()} handleClose={this.handleClick} />
            </>
          ) : (
            <></>
          )}
        </Navbar>
      </>
    );
  }
}

export default Header;
