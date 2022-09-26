import React, { Component } from "react";
import {ModalHeader,ModalTitle, ModalBody, FormLabel, FormControl, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";

class AvailableCars extends Component {

  constructor(props){
    super(props);

    let availableCars = this.props.getAvailableCars();
    this.state = {
      cars: [...availableCars]
    }
  }

    render() {
        return (
          <Modal backdrop={"static"} show={true} onHide={this.props.handleClose}>
            <ModalHeader className="modalHeader" closeButton>
              <ModalTitle>Available Cars</ModalTitle>
            </ModalHeader>
            <ModalBody className="modalBody">
            {this.props.isLoading ? (
            <Spinner className="spinner" animation="border" variant="info" />
          ) : (
            <Table
              className="tableList"
              striped
              bordered
              hover
              variant="dark"
              style={{
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Registration Number</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.cars.map((p, i) => {
                  return (
                    <tr key={p.guid}>
                      <td>{i + 1}</td>
                      <td>{p.registrationNumber}</td>
                      <td>{p.status}</td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )} 
              
            </ModalBody>
          </Modal>
        );
      }
}

export default AvailableCars;