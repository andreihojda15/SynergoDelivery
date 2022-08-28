import React, { Component } from "react";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import "./notFound.css";

export default class NotFound extends Component {
  render() {
    return (
      <div className="notFound">
        <Spinner animation="grow" variant="danger" className="spinner" />
        <Alert variant="danger">
          Wrong url used! Consider navigating through the links above.
        </Alert>
      </div>
    );
  }
}
