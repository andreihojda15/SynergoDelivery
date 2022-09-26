import React, { Component } from "react";
import { ModalBody, ModalHeader, ModalTitle, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

class AvailableCars extends Component {

  constructor(props) {
    super(props);

    let availableCars = this.props.getAvailableCars();
    this.state = {
      cars: [...availableCars],
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.setState({
        cars: [...this.props.getAvailableCars()],
      });
    }
  }

  handleAssign = (car) => {
    return this.props.addCarToDriver({ car, driver: this.props.driver });
  }

  render() {
    return (
      <Modal style={{ marginTop: "100px" }} backdrop={"static"} show={this.props.driver.carId === undefined} onHide={this.props.handleClose}>
        <ModalHeader className="modalHeader" closeButton>
          <ModalTitle>Available Cars</ModalTitle>
        </ModalHeader>
        <ModalBody style={{ display: "flex", justifyContent: 'center' }} className="modalBody">
          {this.props.isLoading ? (
            <Spinner className="spinner" animation="border" variant="info" />
          ) : this.state.cars.length !== 0 ? (
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
                {this.state.cars.map((c, i) => {
                  return (
                    <tr key={c.guid}>
                      <td>{i + 1}</td>
                      <td>{c.registrationNumber}</td>
                      <td>{c.status}</td>
                      <td><Button onClick={() => this.handleAssign(c)} variant="success">Assign</Button></td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : <div>No cars available!</div>}

        </ModalBody>
      </Modal>
    );
  }
}

export default AvailableCars;