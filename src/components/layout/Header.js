import React from "react";
import "./HeaderStyle.css";
import { Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import AddPackage from "../modal/AddPackage";
import Image from "react-bootstrap/Image";

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
            <Image
              src={require("../../assets/images/box.png")}
              alt="header logo"
              className="logo"
            />
            <div className="linkContainer">
              <Link
                className="link1 link"
                to="/packages"
                onClick={this.onPackage}
              >
                Packages
              </Link>
              <Link className="link" to="/cars" onClick={this.notPackage}>
                Cars
              </Link>
              <Link className="link" to="/drivers" onClick={this.notPackage}>
                Drivers
              </Link>
            </div>
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
