import React from "react";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import {
  addCar,
  editCar,
  getCars,
  clearMessages,
  addToCar,
} from "../../redux/cars.slice";

import { getAvailablePackages } from "../../redux/packages.slice";

import AddOrEditCar from "../modal/AddOrEditCar";
import PackageList from "../modal/PackageList";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import "../../style/common.css";
import { uuid4 } from "uuid4";

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

    this.state = {
      showAddOrEditModal: false,
      carSelectedForEdit: undefined,
      errorMessage: undefined,
      showManagePackages: false,
      carSelectedForManage: undefined,
      packageSelectedForManage: undefined,
      readyForAdd: false,
    };
  }

  componentDidMount() {
    this.retrieveCars();
  }

  retrieveCars = () => {
    if (this.props.cars.length === 0) {
      this.setState({
        errorMessage: undefined,
      });
      this.props._getCars().then((res) => {
        if (res.error) {
          this.setState({
            errorMessage: "Error when retrieving cars",
          });
        }
        if (res.payload.length === 0) {
          this.setState({
            errorMessage: "No cars have been retrieved",
          });
        }
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.errorMessage && this.props.errorMessage) {
      toast.error(this.props.errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      this.props._clearMessages();
    }

    if (!prevProps.successMessage && this.props.successMessage) {
      toast.success(this.props.successMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      this.props._clearMessages();
    }

    if (!prevState.readyForAdd && this.state.readyForAdd) {
      this.props._addToCar({
        pack: this.state.packageSelectedForManage,
        car: this.state.carSelectedForManage,
      });
    }
  }

  onEditCar = (car) => {
    this.setState({
      showAddOrEditModal: true,
      carSelectedForEdit: car,
    });
  };

  onAddCar = () => {
    this.setState({
      showAddOrEditModal: true,
      carSelectedForEdit: undefined,
    });
  };

  onManagePackages = (car) => {
    this.setState({
      showManagePackages: true,
      carSelectedForManage: car,
    });
  };

  onCloseManagePackagesModal = () => {
    this.setState({
      showManagePackages: false,
      carSelectedForManage: undefined,
    });
  };

  onCloseAddOrEditModal = () => {
    this.setState({
      showAddOrEditModal: false,
      carSelectedForEdit: undefined,
    });
  };

  setReadyForAdd = (p) => {
    this.setState({
      readyForAdd: true,
      packageSelectedForManage: p,
    });
  };

  unsetReadyForAdd = () => {
    this.setState({
      readyForAdd: false,
      packageSelectedForManage: undefined,
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
                List of Cars
              </Card.Header>
              <Card.Body style={{ textAlign: "center" }} className="cardBody">
                {this.state.errorMessage ? (
                  <p className="errorText">{this.state.errorMessage}</p>
                ) : (
                  <>
                    <Button variant="success" onClick={this.onAddCar}>
                      Add Car
                    </Button>
                    {this.state.showAddOrEditModal && (
                      <AddOrEditCar
                        isLoading={this.props.isEditingCar}
                        handleClose={this.onCloseAddOrEditModal}
                        car={
                          this.state.carSelectedForEdit ?? {
                            guid: uuid4(),
                            registrationNumber: "",
                            status: "",
                          }
                        }
                        title={
                          this.state.carSelectedForEdit ? "Edit Car" : "Add Car"
                        }
                        handleSave={(car) => {
                          this.state.carSelectedForEdit
                            ? this.props._editCar(car).then((response) => {
                                if (!response.error) {
                                  this.onCloseAddOrEditModal();
                                }
                              })
                            : this.props._addCar(car).then((response) => {
                                if (!response.error) {
                                  this.onCloseAddOrEditModal();
                                }
                              });
                        }}
                      />
                    )}
                    {this.state.showManagePackages && (
                      <PackageList
                        packages={this.props.availablePackages}
                        getAvailablePackages={this.props._getAvailablePackages}
                        isLoading={this.props.isLoadingList}
                        handleClose={this.onCloseManagePackagesModal}
                        readyForAdd={this.setReadyForAdd}
                        unsetReadyForAdd={this.unsetReadyForAdd}
                        car={
                          this.state.carSelectedForManage ?? {
                            guid: uuid4(),
                            registrationNumber: "",
                            status: "",
                          }
                        }
                        package={this.state.packageSelectedForManage}
                      />
                    )}
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
                            <td>
                              <Button
                                size="sm"
                                variant="primary"
                                style={{ marginTop: 5 }}
                                onClick={() => {
                                  this.onEditCar(car);
                                }}
                              >
                                Edit
                              </Button>{" "}
                              &nbsp;{" "}
                              <Button
                                size="sm"
                                variant="primary"
                                style={{ marginTop: 5 }}
                                onClick={() => {
                                  this.props.onDelete(car);
                                }}
                              >
                                Delete
                              </Button>
                              &nbsp;{" "}
                              <Button
                                style={{ marginTop: 5 }}
                                size="sm"
                                variant="info"
                                onClick={() => this.onManagePackages(car)}
                              >
                                Manage packages
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </>
                )}
              </Card.Body>
            </Card>
            <ToastContainer theme="dark" />
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    ...store.cars,
    isLoadingList: store.packages.isLoadingList,
    availablePackages: store.packages.availablePackages,
    errorMessagePackage: store.packages.errorMessage,
    successMessagePackage: store.packages.successMessage,
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
    _editCar: (car) => {
      return dispatch(editCar(car));
    },
    _clearMessages: () => {
      return dispatch(clearMessages());
    },
    _getAvailablePackages: (car) => {
      return dispatch(getAvailablePackages(car));
    },
    _addToCar: (data) => {
      return dispatch(addToCar(data));
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
  _addCar: PropTypes.func,
  _editCar: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
