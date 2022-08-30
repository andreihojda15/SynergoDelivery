import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

class AddOrEditDrivers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            driver: {
                ...this.props.driver,
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
                        <div>Saving driver...</div>
                    ) : (
                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={this.state.driver.name}
                                    placeholder="Name"
                                    onChange={(e) =>
                                        this.setState({
                                            driver: { ...this.state.driver, name: e.target.value },
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPhoneNumber">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={this.state.driver.phoneNumber}
                                    placeholder="Phone Number"
                                    onChange={(e) =>
                                        this.setState({
                                            driver: { ...this.state.driver, phoneNumber: e.target.value },
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
                        onClick={() => this.props.handleSave(this.state.driver)}
                        >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

AddOrEditDrivers.propTypes = {
    driver: PropTypes.exact({
        guid: PropTypes.string.isRequired,
        name: PropTypes.string,
        phoneNumber: PropTypes.string,
        status: PropTypes.string,
    }),
    handleClose: PropTypes.func,
    handleSave: PropTypes.func,
    title: PropTypes.string,
    isLoading: PropTypes.bool,
};

export default AddOrEditDrivers;
