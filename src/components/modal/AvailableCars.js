import React, { Component } from "react";
import {ModalHeader,ModalTitle, ModalBody, FormLabel, FormControl, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class AvailableCars extends Component {

    render() {
        return (
          <Modal backdrop={"static"} show={true} onHide={this.props.handleClose}>
            <ModalHeader className="modalHeader" closeButton>
              <ModalTitle>Available Cars</ModalTitle>
            </ModalHeader>
            <ModalBody className="modalBody">
              
              
            </ModalBody>
          </Modal>
        );
      }
}

export default AvailableCars;