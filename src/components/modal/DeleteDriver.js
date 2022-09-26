import React, { Component } from "react";
import { ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class DeleteDriver extends Component {


  render() {
    return (
      <Modal backdrop={"static"} show={true} onHide={this.props.handleClose}>
        <ModalHeader className="modalHeader" closeButton>
          <ModalTitle>Are you sure?</ModalTitle>
        </ModalHeader>
        <ModalBody className="modalBody">
          {this.props.isLoading ? (
            <div>Deleting driver...</div>
            ) : (
            <ModalFooter className="modalFooter">
              <Button disabled={this.props.isLoading} variant="primary" onClick={() => { this.props.handleSave(this.props.driver) }}>
                Delete
              </Button>
              <Button disabled={this.props.isLoading} variant="secondary" onClick={this.props.handleClose}>
                Cancel
              </Button>
            </ModalFooter>
          )}
        </ModalBody>

      </Modal>
    );
  }
}


export default DeleteDriver;