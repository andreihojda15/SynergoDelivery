import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

class AddOrEditCar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      car: {
        ...this.props.car,
      },
    };
  }

  render() {
    return (
      <Modal backdrop={'static'} show={true} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.isLoading ? (
            <div>Saving car...</div>
          ) : (
            <Form>
              <Form.Group className="mb-3" controlId="formRegistration">
                <Form.Label>Registration Number</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.car.registrationNumber}
                  onChange={(e) =>
                    this.setState({
                      car: {
                        ...this.state.car,
                        registrationNumber: e.target.value,
                      },
                    })
                  }
                  placeholder="Registration number"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSender">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.car.status}
                  placeholder="status"
                  onChange={(e) =>
                    this.setState({
                      car: { ...this.state.car, status: e.target.value },
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={this.props.isLoading}
            variant="primary"
            onClick={() => this.props.handleClose()}
          >
            Close
          </Button>
          <Button
            disabled={this.props.isLoading}
            variant="success"
            onClick={() => this.props.handleSave(this.state.car)}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AddOrEditCar.propTypes = {
  car: PropTypes.exact({
    guid: PropTypes.string.isRequired,
    registrationNumber: PropTypes.string,
    status: PropTypes.string,
    packageIds: PropTypes.arrayOf(PropTypes.string),
    driverId: PropTypes.string,
  }),
  handleClose: PropTypes.func,
  handleSave: PropTypes.func,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default AddOrEditCar;
