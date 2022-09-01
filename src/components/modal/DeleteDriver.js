import React, { Component } from "react";
import { ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class DeleteDriver extends Component {


  render() {
    return (
      <Modal backdrop={"static"} show={true} onHide={this.props.handleClose}>
        <ModalHeader closeButton>
          <ModalTitle>Are you sure?</ModalTitle>
        </ModalHeader>
        <ModalFooter>
          <Button variant="primary" onClick={() => { this.props.handleSave(this.props.driver) }}>
            Delete
          </Button>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}


export default DeleteDriver;