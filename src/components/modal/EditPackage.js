import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
//import { connect } from "react-redux";
//import { addPackage, editPackage } from "../../redux/packages.slice";
//import { nanoid } from "nanoid";

class EditePackage extends Component {
  // TO DO add state object
  constructor(props) {
    super(props);

    this.state = {
      pack: {
        ...this.props.pack,
      },
    };
  }

  render() {
    return (
      <Modal show={true} backdrop={"static"} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formAWB">
              <Form.Label>AWB</Form.Label>
              <Form.Control
                type="text"
                value={this.state.pack.awb}
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
                value={this.state.pack.senderName}
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
                value={this.state.pack.senderPhoneNumber}
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
                value={this.state.pack.departureAdress}
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
                value={this.state.pack.departureDate.value}
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
                value={this.state.pack.recipientName}
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
                value={this.state.pack.recipientPhoneNumber}
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
                value={this.state.pack.deliveryAdress}
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
        <Modal.Footer>
          <Button variant="primary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() => this.props.handleSave(this.state.pack)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditePackage;
