import React from "react";
import "./HeaderStyle.css";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import AddDrivers from "../modal/AddDrivers";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      drivers: true,
    };
  }

  handleClick = () => {
    this.setState({ show: !this.state.show });
  };

  notDrivers = () => {
    this.setState({
      drivers: false,
    });
  };

  onDrivers = () => {
    this.setState({
      drivers: true,
    });
  };

  show = () => this.state.show;

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
              <Link className="link" to="/packages" onClick={this.notDrivers}>
                Packages
              </Link>
              <Link className="link" to="/cars" onClick={this.notDrivers}>
                Cars
              </Link>
              <Link className="link" to="/drivers" onClick={this.onDrivers}>
                Drivers
              </Link>
            </div>
          </Container>
          {this.state.drivers ? (
            <>
              <Button variant="success" onClick={this.handleClick}>
                Add
              </Button>
              <AddDrivers show={this.show()} handleClose={this.handleClick} />
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
