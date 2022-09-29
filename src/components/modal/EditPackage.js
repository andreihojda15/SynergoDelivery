import moment from "moment";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../style/common.css";

class EditPackage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pack: {
        ...this.props.pack,
      },
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <Modal show={true} backdrop={"static"} onHide={this.props.handleClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Edit Package</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
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
                      senderPhone: e.target.value,
                    },
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDepatureAddress">
              <Form.Label>Departure Address</Form.Label>
              <Form.Control
                type="text"
                value={this.state.pack.departureAddress}
                placeholder="Departure"
                onChange={(e) =>
                  this.setState({
                    pack: {
                      ...this.state.pack,
                      departureAddress: e.target.value,
                    },
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDepDate">
              <Form.Label>Departure Date</Form.Label>
              <Form.Control
                type="date"
                value={moment(`${this.state.pack.departureDate[0]}-${this.state.pack.departureDate[1]}-${this.state.pack.departureDate[2]}`, 'YYYY-M-D', true).format('YYYY-MM-DD')}
                onChange={(e) => {
                  return this.setState({
                    pack: {
                      ...this.state.pack,
                      departureDate: moment(e.target.value, 'YYYY-MM-DD', true).format('YYYY-MM-DD').split('-'),
                    },
                  })
                }
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
                value={this.state.pack.recipientPhone}
                placeholder="Phone"
                onChange={(e) =>
                  this.setState({
                    pack: {
                      ...this.state.pack,
                      recipientPhone: e.target.value,
                    },
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRepicAddress">
              <Form.Label>Recipient Address</Form.Label>
              <Form.Control
                type="text"
                value={this.state.pack.deliveryAddress}
                placeholder="Address"
                onChange={(e) =>
                  this.setState({
                    pack: {
                      ...this.state.pack,
                      deliveryAddress: e.target.value,
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
            onClick={() => this.props.handleSave(this.state.pack)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditPackage;
