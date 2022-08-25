import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { addPackage, getPackages } from "../../redux/packages.slice";
import { nanoid } from "nanoid";

class AddPackage extends Component {
  render() {
    let object = {};
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formAWB">
              <Form.Label>AWB</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => (object.awb = e.target.value)}
                placeholder="AWB"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSender">
              <Form.Label>Sender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sender"
                onChange={(e) => (object.senderName = e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSenderPhone">
              <Form.Label>Sender Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                onChange={(e) => (object.senderPhoneNumber = e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDepatureAddress">
              <Form.Label>Departure Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Departure"
                onChange={(e) => (object.departureAdress = e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDepDate">
              <Form.Label>Departure Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                onChange={(e) => (object.departureDate = e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRepicName">
              <Form.Label>Recipient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) => (object.recipientName = e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRepicPhone">
              <Form.Label>Recipient Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                onChange={(e) => (object.recipientPhoneNumber = e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRepicAddress">
              <Form.Label>Recipient Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={(e) => (object.deliveryAdress = e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAssignedCar">
              <Form.Label>Assigned to Car</Form.Label>
              <Form.Check
                type="radio"
                id="yesCar"
                name="carRadio"
                label="Yes"
                value="yes"
                onChange={(e) => (object.assignedToCar = e.target.value)}
              />
              <Form.Check
                type="radio"
                id="noCar"
                name="carRadio"
                label="No"
                value="no"
                onChange={(e) => (object.assignedToCar = e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStatus">
              <Form.Label>Package Status</Form.Label>
              <Form.Check
                type="radio"
                id="sent"
                name="packageStatus"
                label="Sent"
                value="sent"
                onChange={(e) => (object.packageStatus = e.target.value)}
              />
              <Form.Check
                type="radio"
                id="indelivery"
                name="packageStatus"
                label="In delivery"
                value="in delivery"
                onChange={(e) => (object.packageStatus = e.target.value)}
              />
              <Form.Check
                type="radio"
                id="delivered"
                name="packageStatus"
                label="Delivered"
                value="delivered"
                onChange={(e) => (object.packageStatus = e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => {
              object.guid = nanoid();
              return this.props._addPackage(object);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    ...store.packages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _getPackages: () => {
      return dispatch(getPackages());
    },
    _addPackage: (pack) => {
      return dispatch(addPackage(pack));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPackage);
