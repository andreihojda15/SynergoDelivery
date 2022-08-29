import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ModalFooter } from "react-bootstrap";
import { connect } from "react-redux";
import { editDrivers } from "../../redux/drivers.slice";


class EditDrivers extends Component{
    constructor(props){
        super(props);

        this.state={};
    }

    render(){
        return(
            <Modal show={this.props.show} onHide={this.props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Driver</Modal.Title>
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
            <ModalFooter>
                <Button variant="success" onClick={()=> {return this.props._editDrivers()}}>
                    Apply         
                </Button>
            </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = (store) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
    _editDrivers: (props) => {
        return dispatch(editDrivers(props));
    },
};
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDrivers);