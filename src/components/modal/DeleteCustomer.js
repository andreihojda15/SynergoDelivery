import React, { Component } from "react";
import { ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class DeleteCustomer extends Component {

    

  render() {
    return (
      <Modal backdrop={"static"} show={true} onHide={this.props.handleClose}>
        <ModalHeader className="modalHeader" closeButton>
          <ModalTitle>Are you sure?</ModalTitle>
        </ModalHeader>
        {this.props.isLoading ? (
            <div>Deleting Customer...</div>
            ) : (
            <ModalFooter className="modalFooter">
              <Button disabled={this.props.isLoading} variant="primary" onClick={() => { this.props.handleSave(this.props.customer) }}>
                Delete
              </Button>
              <Button disabled={this.props.isLoading} variant="secondary" onClick={this.props.handleClose}>
                Cancel
              </Button>
            </ModalFooter>
          )}
      </Modal>
    );
  }
}


export default DeleteCustomer;