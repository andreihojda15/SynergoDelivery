import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from "prop-types";
import "../../style/common.css";
import { getAvailablePackages } from "../../redux/packages.slice";
import { connect } from "react-redux";

class PackageList extends React.Component {
  constructor(props) {
    super(props);

    // let availablePackages = this.props.getAvailablePackages();
    this.props._getAvailablePackages(this.props.car.id);
    this.state = {
      car: {
        ...this.props.car,
      },
    };
  }

  componentDidMount() {
    this.props.unsetReadyForAdd();
    this.props.unsetReadyForDelete();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading && !this.props.isLoading) {
      // this.props._getAvailablePackages(this.props.car.id)
    }
  }

  assignToCar = (p) => {
    this.props.readyForAdd(p);
  };

  deleteFromCar = (p) => {
    this.props.readyForDelete(p);
  };

  render() {
    return (
      <Modal
        size="xl"
        dialogClassName="modal-90w"
        className="test"
        backdrop={"static"}
        show={true}
        onHide={this.props.handleClose}
      >
        <Modal.Header
          className="modalHeader"
          closeButton
          style={{
            textAlign: "center",
          }}
        >
          <Modal.Title>Packages</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="modalBody"
          style={{ overflow: "auto", display: "flex" }}
        >
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
                  <th>AWB</th>
                  <th>Sender</th>
                  <th>Sender Phone</th>
                  <th>Departure Adress</th>
                  <th>Departure Date</th>
                  <th>Recipient Name</th>
                  <th>Recipient Phone</th>
                  <th>Recipient Adress</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.availablePackages.map((p, i) => {
                  return (
                    <tr key={p.id}>
                      <td>{i + 1}</td>
                      <td>{p.awb}</td>
                      <td>{p.senderName}</td>
                      <td>{p.senderPhoneNumber}</td>
                      <td>{p.departureAddress}</td>
                      <td>{p.departureDate}</td>
                      <td>{p.recipientName}</td>
                      <td>{p.recipientPhone}</td>
                      <td>{p.deliveryAddress}</td>
                      <td
                        style={{
                          width: "20rem",
                        }}
                      >
                        {p.carId !== undefined && p.carId !== null ? (
                          <Button
                            variant="primary"
                            size="sm"
                            style={{
                              margin: "2px",
                            }}
                            onClick={() => this.deleteFromCar(p)}
                          >
                            Remove from car
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            size="sm"
                            style={{
                              margin: "2px",
                            }}
                            onClick={() => this.assignToCar(p)}
                          >
                            Add to car
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    ...store.packages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _getAvailablePackages: (id) => {
      return dispatch(getAvailablePackages(id));
    }
  };
};

PackageList.propTypes = {
  // getAvailablePackages: PropTypes.func.isRequired,
  car: PropTypes.object.isRequired,
  unsetReadyForAdd: PropTypes.func.isRequired,
  unsetReadyForDelete: PropTypes.func.isRequired,
  readyForAdd: PropTypes.func,
  readyForDelete: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

// export default PackageList;
export default connect(mapStateToProps, mapDispatchToProps)(PackageList);
