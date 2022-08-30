import React, { Component } from "react";
import { ModalFooter } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { deleteDrivers } from "../../redux/drivers.slice";


class DeleteDrivers extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <ModalFooter>
                    <Button variant="success" onClick={() => { return this.props._deleteDrivers() }}>

                        Yes

                    </Button>
                    <Button variant="secondary" onClick={() => { return this.props._deleteDrivers() }}>

                        No

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
        _deleteDrivers: (props) => {
            return dispatch(deleteDrivers(props));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDrivers);
