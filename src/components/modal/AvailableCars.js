import React, { Component } from "react";
import { ModalBody, ModalHeader, ModalTitle, Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
import { getAvailableCars } from "../../redux/cars.slice";
import { addCarToDriver } from "../../redux/drivers.slice";

class AvailableCars extends Component {

  constructor(props) {
    super(props);

    this.props._getAvailableCars();
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.isLoading && !this.props.isLoading) {
  //     // this.setState({
  //     //   cars: [...this.props.getAvailableCars()],
  //     // });
  //   }
  // }

  handleAssign = (car) => {
    return this.props._addCarToDriver({ car, driver: this.props.driver });
  }

  render() {
    return (
      <Modal style={{ marginTop: "100px" }} backdrop={"static"} show={this.props.driver.carId === null} onHide={this.props.handleClose}>
        <ModalHeader className="modalHeader" closeButton>
          <ModalTitle>Available Cars</ModalTitle>
        </ModalHeader>
        <ModalBody style={{ display: "flex", justifyContent: 'center' }} className="modalBody">
          {this.props.isLoadingAvailableCars ? (
            <Spinner className="spinner" animation="border" variant="info" />
          ) : this.props.availableCars.length !== 0 ? (
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
                {this.props.availableCars.map((c, i) => {
                  return (
                    <tr key={c.id}>
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

const mapStateToProps = (store) => {
  return {
    ...store.cars,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _getAvailableCars: () => {
      return dispatch(getAvailableCars());
    },
    _addCarToDriver: (data) => {
      return dispatch(addCarToDriver(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableCars);
