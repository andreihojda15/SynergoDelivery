import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
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

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Driver</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Name"
                                onChange={(e) =>
                                    this.setState({
                                        pack: { ...this.state.pack, name: e.target.value },
                                    })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Phone Number"
                                onChange={(e) =>
                                    this.setState({
                                        pack: { ...this.state.pack, phoneNumber: e.target.value },
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
