import React from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import PropTypes from "prop-types";
import "../../style/common.css";

class PackageList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      packages: {
        ...this.props.packages,
      },
      car: {
        ...this.props.car,
      },
    };
  }

  componentDidMount() {
    this.props.getAvailablePackages(this.state.car);
  }

  assignCar = () => {};

  render() {
    return (
      <Modal
        size="xl"
        dialogClassName="modal-90w"
        className="test"
        backdrop={"static"}
        show={true}
        onHide={this.props.handleClose}
        style={{
          marginTop: "100px",
        }}
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
                {this.props.packages.map((p, i) => (
                  <tr key={p.guid}>
                    <td>{i + 1}</td>
                    <td>{p.awb}</td>
                    <td>{p.senderName}</td>
                    <td>{p.senderPhoneNumber}</td>
                    <td>{p.departureAdress}</td>
                    <td>{p.departureDate}</td>
                    <td>{p.recipientName}</td>
                    <td>{p.recipientPhoneNumber}</td>
                    <td>{p.deliveryAdress}</td>
                    <td>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={this.assignCar}
                      >
                        Assign to car
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

PackageList.propTypes = {
  _getAvailablePackages: PropTypes.func,
  packages: PropTypes.arrayOf(PropTypes.object),
  car: PropTypes.object,
  isLoading: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default PackageList;
