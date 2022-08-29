import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import InputGroup from 'react-bootstrap/InputGroup';
import { connect } from "react-redux";
import { addDrivers } from "../../redux/drivers.slice";

class AddDrivers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pack: {
                name: "",
                phoneNumber: "",
            },
        };
    }

     handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
     
      };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Driver</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" controlId="validationCustom01">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Name"
                                onChange={(e) =>
                                    this.setState({
                                        pack: { ...this.state.pack, name: e.target.value },
                                    })
                                }
                            />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="validationCustom02">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Phone Number"
                                onChange={(e) =>
                                    this.setState({
                                        pack: { ...this.state.pack, phoneNumber: e.target.value },
                                    })
                                }
                            />
                             <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                            return this.props._addDrivers(this.state.pack);
                        }}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = (store) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        _addDrivers: (pack) => {
            return dispatch(addDrivers(pack));
        },
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(AddDrivers);
