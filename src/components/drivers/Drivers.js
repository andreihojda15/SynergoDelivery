import PropTypes from "prop-types";
import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCars } from "../../redux/cars.slice";
import { addCarToDriver } from "../../redux/common.thunks";
import {
  addDriver, clearMessages, deleteDriver, editDriver, getDrivers
} from '../../redux/drivers.slice';
import "../../style/common.css";
import AddOrEditDrivers from "../modal/AddOrEditDrivers";
import AvailableCars from "../modal/AvailableCars";
import DeleteDriver from "../modal/DeleteDriver";



/**
 * Driver model:
 *  id
 *  name
 *  phone
 *  carId // car id, can be undefined => status: busy / available
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


    this.state = {
      showAddOrEditModal: false,
      driverSelectedForEdit: undefined,
      showDeleteModal: false,
      driverSelectedForDelete: undefined,
      driverSelectedForAssign: undefined,
      showAvailableCarsModal: false,
      errorMessage: undefined,
      readyToAssign: false,
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
      driverSelectedForEdit: {
        id: driver.id,
        name: driver.name,
        phone: driver.phone,
        carId: driver.carId,
        status: driver.carId ? "Busy" : "Available",
      },
    });
  };

  assignCarToDriver = (c) => {
    this.props._addCarToDriver(c);
    this.onCloseAvailableCarsModal();
  }

  onDeleteDriver = (driver) => {
    this.setState({
      showDeleteModal: true,
      driverSelectedForDelete: driver,
    })
  }

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
  }

  componentDidMount() {
    this.retrieveDrivers();
  }

  getAvailableCars = () => {
    return this.props.cars.filter((car) => {
      return car.status === 'Not Available';
    })
  }

  onAvailableCars = (driver) => {
    this.setState({
      showAvailableCarsModal: true,
      driverSelectedForAssign: driver,
    })
  }

  onCloseAvailableCarsModal = () => {
    this.setState({
      showAvailableCarsModal: false,
    });
  };

  retrieveDrivers = () => {
    if (this.props.drivers.length === 0) {
      this.setState({
        errorMessage: undefined,
      });
      this.props._getDrivers().then((res) => {
        if (res.error) {
          this.setState({
            errorMessage: "Error when retrieving drivers",
          });
        }
        if (res.payload.length === 0) {
          this.setState({
            errorMessage: "No drivers have been retrieved",
          });
        }
      });
    }
    if (this.props.cars.length === 0) {
      this.props._getCars();
    }
  };

  onCloseDeleteModal = () => {
    this.setState({
      showDeleteModal: false,
      driverSelectedForDelete: undefined,
    });
  };

  render() {
    console.log(`--- render: ${this.state.showAddOrEditModal}`);
    return (
      <>
        {this.props.isLoading ? (
          <Spinner className="spinner" animation="border" variant="info" />
        ) : (
          <>
            <Card bg="dark" text="white" className="cardTable">
              <Card.Header style={{ textAlign: "center" }}>
                List of Drivers
              </Card.Header>
              {this.state.showAddOrEditModal && (
                <AddOrEditDrivers
                  isLoading={this.props.isEditingDriver}
                  handleClose={this.onCloseAddOrEditModal}
                  driver={
                    this.state.driverSelectedForEdit ?? {
                      name: "",
                      phone: "",
                      status: "",
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
              <Card.Body style={{ textAlign: "center" }} className="cardBody">
                {this.state.errorMessage ? (
                  <p className="errorText">{this.state.errorMessage}</p>
                ) : (
                  <>
                    <Table
                      className="tableData"
                      striped
                      bordered
                      hover
                      variant="dark"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Phone Number</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.drivers.map((driver, i) => (
                          <tr key={driver.id}>
                            <td>{i + 1}</td>
                            <td>{driver.name}</td>
                            <td>{driver.phone}</td>
                            <td>
                              {
                                driver.carId ?
                                  <Button
                                    size="sm"
                                    variant="primary"
                                  >
                                    Available
                                  </Button>
                                  :
                                  <Button
                                    size="sm"
                                    variant="success"
                                    onClick={() => {
                                      this.onAvailableCars(driver);
                                    }}
                                  >
                                    Assign to car
                                  </Button>
                              }

                            </td>
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
                                  this.onDeleteDriver(driver);
                                }}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </>
                )}
              </Card.Body>
              <Card.Footer className="cardFooter">
                <Button variant="success" onClick={this.onAddDriver}>
                  Add Driver
                </Button>
              </Card.Footer>
              {this.state.showDeleteModal && (
                <DeleteDriver
                  handleClose={this.onCloseDeleteModal}
                  driver={this.state.driverSelectedForDelete}
                  handleSave={(driver) => {
                    this.props._deleteDriver(driver).then((response) => {
                      if (!response.error) {
                        this.onCloseDeleteModal();
                      }
                    })
                  }}
                />)}
              {this.state.showAvailableCarsModal && (
                <AvailableCars
                  handleClose={this.onCloseAvailableCarsModal}
                  getAvailableCars={this.getAvailableCars}
                  driver={this.state.driverSelectedForAssign}
                  addCarToDriver={this.assignCarToDriver}
                  isLoading={this.props.isLoadingDriverToCar}
                />
              )}
            </Card>
          </>
        )}
        <ToastContainer theme="dark" />
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    ...store.drivers,
    ...store.cars,
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
    _deleteDriver: (driver) => {
      return dispatch(deleteDriver(driver));
    },
    _clearMessages: () => {
      return dispatch(clearMessages());
    },
    _getCars: () => {
      return dispatch(getCars());
    },
    _addCarToDriver: (data) => {
      return dispatch(addCarToDriver(data));
    },
  };
};

Drivers.propTypes = {
  drivers: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      phone: PropTypes.string,
      carId: PropTypes.number,
      status: PropTypes.string,
    })
  ),
  _getDrivers: PropTypes.func,
  _addDriver: PropTypes.func,
  _editDriver: PropTypes.func,
  _deleteDriver: PropTypes.func,
  _getCars: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drivers);
