import React from "react";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { addCar, getCars, clearMessages } from "../../redux/cars.slice";
import AddCar from "../modal/addCar";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import "../../style/common.css";

/**
 * Car model:
 *  guid
 *  registrationNumber
 *  status // available, not available
 *  packageIds // array of package guids
 *  driverId // driver guid
 *
 *  Table columns
 *  #
 *  Registration number
 *  Status
 *  Number of Packages
 *  Assigned to a Driver - Yes / No
 */

class Cars extends React.Component {
  constructor(props) {
    super(props);
    this.props._getCars();
    this.state = {
      show: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.errorMessage && this.props.errorMessage) {
      toast.error(this.props.errorMessage,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        });

      this.props._clearMessages();
    }

    if (!prevProps.successMessage && this.props.successMessage) {
      toast.success(this.props.successMessage,
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000
        });

      this.props._clearMessages();
    }
  }
  handleClick = () => {
    this.setState({ show: !this.state.show });
  };

  show = () => this.state.show;

  render() {
    return (
      <>
        {this.props.isLoading ? (
          <Spinner className="spinner" animation="border" variant="info" />
        ) : (
          <Card bg="dark" text="white" className="cardTable">
            <Card.Header style={{ textAlign: "center" }}>
              List of Cars
            </Card.Header>
            <Button variant="success" onClick={this.handleClick}>
              Add Car
            </Button>
            <AddCar show={this.show()} handleClose={this.handleClick} />
            <Table className="table" striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Registration number</th>
                  <th>Status</th>
                  <th>Number of Packages</th>
                  <th>Assigned to a Driver</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.props.cars.map((car, i) => (
                  <tr key={car.guid}>
                    <td>{i + 1}</td>
                    <td>{car.registrationNumber}</td>
                    <td>{car.status}</td>
                    <td>{car.packageIds?.length}</td>
                    <td>{car.driverId ? "Yes" : "No"}</td>
                    <td><Button size="sm" variant="primary" onClick={() => { this.props.onEdit(car) }}>Edit</Button> &nbsp; <Button size="sm" variant="primary" onClick={() => { this.props.onDelete(car) }}>Delete</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}
        <ToastContainer />
      </>

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
    _getCars: () => {
      return dispatch(getCars());
    },
    _addCar: (car) => {
      return dispatch(addCar(car));
    },
    _clearMessages: () => {
      return dispatch(clearMessages());
    },

  };
};

Cars.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.exact({
      guid: PropTypes.string.isRequired,
      registrationNumber: PropTypes.string,
      status: PropTypes.string,
      packageIds: PropTypes.arrayOf(PropTypes.string),
      driverId: PropTypes.string,
    })
  ),
  _getCars: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
