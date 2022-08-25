import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

class AddPackage extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formAWB">
              <Form.Label>AWB</Form.Label>
              <Form.Control type="text" placeholder="AWB" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSender">
              <Form.Label>Sender</Form.Label>
              <Form.Control type="text" placeholder="Sender" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSenderPhone">
              <Form.Label>Sender Phone</Form.Label>
              <Form.Control type="text" placeholder="Phone" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDepatureAddress">
              <Form.Label>Departure Address</Form.Label>
              <Form.Control type="text" placeholder="Departure" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDepDate">
              <Form.Label>Departure Date</Form.Label>
              <Form.Control type="date" placeholder="Date" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRepicName">
              <Form.Label>Recipient Name</Form.Label>
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRepicPhone">
              <Form.Label>Recipient Phone</Form.Label>
              <Form.Control type="text" placeholder="Phone" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRepicAddress">
              <Form.Label>Recipient Address</Form.Label>
              <Form.Control type="text" placeholder="Address" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAssignedCar">
              <Form.Label>Assigned to Car</Form.Label>
              <Form.Check
                type="radio"
                id="yesCar"
                name="carRadio"
                label="Yes"
              />
              <Form.Check type="radio" id="noCar" name="carRadio" label="No" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Package Status</Form.Label>
              <Form.Check
                type="radio"
                id="sent"
                name="packageStatus"
                label="Sent"
              />
              <Form.Check
                type="radio"
                id="in delivery"
                name="packageStatus"
                label="In delivery"
              />
              <Form.Check
                type="radio"
                id="delivered"
                name="packageStatus"
                label="Delivered"
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={this.props.handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddPackage;
