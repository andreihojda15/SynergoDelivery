import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import DeleteDrivers from "../modal/DeleteDrivers";
import AddOrEditDrivers from "../modal/AddOrEditDrivers";
import "../../style/common.css";
import { nanoid } from "nanoid";

import {
  getDrivers,
  addDriver, 
  editDriver, 
  deleteDrivers, 
  clearMessages,
} from '../../redux/drivers.slice';



/**
 * Driver model:
 *  guid
 *  name
 *  phoneNumber
 *  carId // car guid, can be undefined => status: busy / available
 *
 *  Table columns
 *  #
 *  Name
 *  Phone number
 *  Status
 */

class Drivers extends Component {
  constructor(props) {
    super(props);
    this.props._getDrivers();

    if (this.props.drivers.length === 0) {
      this.props._getDrivers();
    }

    this.state = {
      showAddOrEditModal: false,
      driverSelectedForEdit: undefined,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.errorMessage && this.props.errorMessage) {
      toast.error(this.props.errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });

      this.props._clearMessages();
    }

    if (!prevProps.successMessage && this.props.successMessage) {
      toast.success(this.props.successMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });

      this.props._clearMessages();
    }
  }

  onEditDriver = (driver) => {
    this.setState({
      showAddOrEditModal: true,
      driverSelectedForEdit: driver,
    });
  };

  onAddDriver = () => {
    this.setState({
      showAddOrEditModal: true,
      driverSelectedForEdit: undefined,
    });
  };

  onCloseAddOrEditModal = () => {
    this.setState({
      showAddOrEditModal: false,
      driverSelectedForEdit: undefined,
    });
  };

  render() {
    console.log(`--- render: ${this.state.showAddOrEditModal}`);
    return (
      <>
        {this.props.isLoading ? (
          <Spinner className="spinner" animation="border" variant="info" />
        ) : (
          <Card bg="dark" text="white" className="cardTable">
            <Card.Header style={{ textAlign: "center" }}>
              List of Drivers
            </Card.Header>
            <Button variant="success" size="lg" onClick={this.onAddDriver}>
              Add Driver
            </Button>
            {this.state.showAddOrEditModal && (
              <AddOrEditDrivers
                isLoading={this.props.isEditingDriver}
                handleClose={this.onCloseAddOrEditModal}
                driver={
                  this.state.driverSelectedForEdit ?? {
                    guid: nanoid(),
                    name: "",
                    phoneNumber: "",
                  }
                }
                title={this.state.driverSelectedForEdit ? "Edit Driver" : "Add Driver"}
                handleSave={(driver) => {
                  this.state.driverSelectedForEdit
                    ? this.props._editDriver(driver).then((response) => {
                      if (!response.error) {
                        this.onCloseAddOrEditModal();
                      }
                    })
                    : this.props._addDriver(driver).then((response) => {
                      if (!response.error) {
                        this.onCloseAddOrEditModal();
                      }
                    });
                }}
              />
            )}
            <Table className="table" striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.drivers.map((driver, i) => (
                  <tr key={driver.guid}>
                    <td>{i + 1}</td>
                    <td>{driver.name}</td>
                    <td>{driver.phoneNumber}</td>
                    <td>{driver.carId ? "Busy" : "Available"}</td>
                    <td>
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          this.onEditDriver(driver);
                        }}
                      >
                        Edit
                      </Button>{" "}
                      &nbsp;{" "}
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => {
                          this.props.onDelete(driver);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}
        <ToastContainer theme="dark" />
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    ...store.drivers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _getDrivers: () => {
      return dispatch(getDrivers());
    },
    _addDriver: (driver) => {
      return dispatch(addDriver(driver));
    },
    _editDriver: (driver) => {
      return dispatch(editDriver(driver));
    },
    _deleteDrivers: (driver) => {
      return dispatch(deleteDrivers(driver));
    },
    _clearMessages: () => {
      return dispatch(clearMessages());
    },

  };
};

Drivers.propTypes = {
  drivers: PropTypes.arrayOf(
    PropTypes.exact({
      guid: PropTypes.string.isRequired,
      name: PropTypes.string,
      phoneNumber: PropTypes.string,
      status: PropTypes.string,
     
    })
  ),
  _getCars: PropTypes.func,
  _addCar: PropTypes.func,
  _editCar: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drivers);
