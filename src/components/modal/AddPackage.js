import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { addPackage } from "../../redux/packages.slice";
import { nanoid } from "nanoid";
import "./AddPackage.css";

class AddPackage extends Component {
  // TO DO add state object
  constructor(props) {
    super(props);

    this.state = {
      pack: {
        guid: nanoid(),
        awb: "",
        senderName: "",
        senderPhoneNumber: "",
        departureAdress: "",
        departureDate: "",
        recipientName: "",
        recipientPhoneNumber: "",
        deliveryAdress: "",
      },
    };
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Add Package</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <Form>
            <Form.Group className="mb-3" controlId="formAWB">
              <Form.Label>AWB</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  this.setState({
                    pack: { ...this.state.pack, awb: e.target.value },
                  })
                }
                placeholder="AWB"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSender">
              <Form.Label>Sender</Form.Label>
              <Form.Control
                type="text"
                placeholder="Sender"
                onChange={(e) =>
                  this.setState({
                    pack: { ...this.state.pack, senderName: e.target.value },
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formSenderPhone">
              <Form.Label>Sender Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                onChange={(e) =>
                  this.setState({
                    pack: {
                      ...this.state.pack,
                      senderPhoneNumber: e.target.value,
                    },
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDepatureAddress">
              <Form.Label>Departure Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Departure"
                onChange={(e) =>
                  this.setState({
                    pack: {
                      ...this.state.pack,
                      departureAdress: e.target.value,
                    },
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDepDate">
              <Form.Label>Departure Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                onChange={(e) =>
                  this.setState({
                    pack: {
                      ...this.state.pack,
                      departureDate: new Date(
                        e.target.value
                      ).toLocaleDateString(),
                    },
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRepicName">
              <Form.Label>Recipient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  this.setState({
                    pack: { ...this.state.pack, recipientName: e.target.value },
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRepicPhone">
              <Form.Label>Recipient Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone"
                onChange={(e) =>
                  this.setState({
                    pack: {
                      ...this.state.pack,
                      recipientPhoneNumber: e.target.value,
                    },
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRepicAddress">
              <Form.Label>Recipient Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={(e) =>
                  this.setState({
                    pack: {
                      ...this.state.pack,
                      deliveryAdress: e.target.value,
                    },
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modalFooter">
          <Button variant="primary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => {
              return this.props._addPackage(this.state.pack);
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
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    _addPackage: (pack) => {
      return dispatch(addPackage(pack));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPackage);
