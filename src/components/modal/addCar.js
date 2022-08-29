import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { addCar } from "../../redux/cars.slice";
import { nanoid } from "nanoid";



class AddCar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            car: {
                guid: nanoid(),
                registrationNumber: "",
                status: "",
            },
        };
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Car</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formRegistration">
                            <Form.Label>Registration Number</Form.Label>
                            <Form.Control
                                type="text"
                                onChange={(e) =>
                                    this.setState({
                                        car: { ...this.state.car, registrationNumber: e.target.value },
                                    })
                                }
                                placeholder="Registration number"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formSender">
                            <Form.Label>Status</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="status"
                                onChange={(e) =>
                                    this.setState({
                                        car: { ...this.state.car, status: e.target.value },
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
                        onClick={() => {
                            return this.props._addCar(this.state.car);
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
        _addCar: (car) => {
            return dispatch(addCar(car));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCar);
