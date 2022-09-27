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
  // deleteCar,
  clearMessages,
} from "../../redux/cars.slice";

import { getAvailablePackages, getPackages } from "../../redux/packages.slice";

import AddOrEditCar from "../modal/AddOrEditCar";
import PackageList from "../modal/PackageList";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import "../../style/common.css";
import { uuid4 } from "uuid4";
import { addPackageToCar, removeFromCar } from "../../redux/common.thunks";

/**
 * Car model:
 *  id
 *  registrationNumber
 *  status // available, not available
 *  packageIds // array of package ids
 *  driverId // driver id
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
      showDeleteCar: false,
      carSelectedForDelete: undefined,
      showManagePackages: false,
      carSelectedForManage: undefined,
      packageSelectedForManage: undefined,
      readyForAdd: false,
      readyForDelete: false,
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
    if (this.props.packages.length === 0) {
      this.props._getPackages();
    }
  };

  getAvailablePackages = () => {
    return this.props._getAvailablePackages(this.state.carSelectedForManage.id);
    // if (this.state.carSelectedForManage) {
    //   let result = this.props.packages.filter(
    //     (pack) => {
    //       return pack.carId === undefined ||
    //         pack.carId === null ||
    //         pack.carId === this.state.carSelectedForManage.id
    //     }
    //   );
    //   return result;
    // }
    // return [];
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
  }

  onEditCar = (car) => {
    this.setState({
      showAddOrEditModal: true,
      carSelectedForEdit: car,
    });
  };

  onDelete = (car) => {
    this.setState({
      showDeleteCar: true,
      carSelectedForDelete: car,
    })
  }

  onAddCar = () => {
    this.setState({
      showAddOrEditModal: true,
      carSelectedForEdit: undefined,
    });
  };

  onManagePackages = (car) => {
    this.setState({
      showManagePackages: true,
      carSelectedForManage: this.props.cars.find(
        (item) => item.id === car.id
      ),
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


  onDeleteModal = (car) => {
    this.setState({
      showDeleteCar: false,
      carSelectedForDelete: car,
    })
  }

  setReadyForAdd = (p) => {
    this.props._addPackageToCar({
      pack: p,
      car: this.props.cars.find(
        (item) => item.id === this.state.carSelectedForManage.id
      ),
    });
  };

  unsetReadyForAdd = () => {
    this.setState({
      readyForAdd: false,
      packageSelectedForManage: undefined,
    });
  };

  setReadyForDelete = (p) => {
    this.props._removeFromCar({
      pack: p,
      car: this.props.cars.find(
        (item) => item.id === this.state.carSelectedForManage.id
      ),
    });
  };

  unsetReadyForDelete = () => {
    this.setState({
      readyForDelete: false,
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
                <Button variant="success" onClick={this.onAddCar}>
                  Add Car
                </Button>
              </Card.Header>
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
                  title={this.state.carSelectedForEdit ? "Edit Car" : "Add Car"}
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

              <Card.Body style={{ textAlign: "center" }} className="cardBody">
                {this.state.errorMessage ? (
                  <p className="errorText">{this.state.errorMessage}</p>
                ) : (
                  <>
                    {this.state.showAddOrEditModal && (
                      <AddOrEditCar
                        isLoading={this.props.isEditingCar}
                        handleClose={this.onCloseAddOrEditModal}
                        car={
                          this.state.carSelectedForEdit ?? {
                            id: uuid4(),
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
                        // getAvailablePackages={this.getAvailablePackages}
                        // availablePacks={this.props.availablePackages}
                        car={
                          this.state.carSelectedForManage ?? {
                            id: uuid4(),
                            registrationNumber: "",
                            status: "",
                          }
                        }
                        unsetReadyForAdd={this.unsetReadyForAdd}
                        unsetReadyForDelete={this.unsetReadyForDelete}
                        readyForAdd={this.setReadyForAdd}
                        readyForDelete={this.setReadyForDelete}
                        isLoading={this.props.isLoadingList}
                        handleClose={this.onCloseManagePackagesModal}
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
                          <tr key={car.id}>
                            <td>{i + 1}</td>
                            <td>{car.registrationNumber}</td>
                            <td>{car.status}</td>
                            <td>{this.props.packages.filter(pack => pack.carId === car.id).length}</td>
                            <td>{this.props.drivers.filter(driver => driver.carId === car.id).length !== 0 ? "Yes" : "No"}</td>
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
                                  this.onDelete(car);
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
              {/* {this.state.showDeleteCar && (
                <DeleteCar
                  show={this.state.showDeleteCar}
                  handleClose={() => this.setState({ showDeleteCar: false, carSelectedForDelete: undefined })}
                  car={this.state.carSelectedForDelete}
                  handleSave={(car) => {
                    this.props._deleteCar(car).then((response) => {
                      if (!response.error) {
                        this.onDeleteModal();
                        // this.setState({ showDeleteCar: false, carSelectedForDelete: undefined })
                      }
                    })

                  }}
                />
              )}; */}
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
    drivers: store.drivers.drivers,
    isFinished: store.packages.isFinished,
    packages: store.packages.packages,
    isLoadingList: store.packages.isLoadingList,
    availablePackages: store.packages.availablePackages,
    getPackage: store.packages.getPackage,
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
    // _deleteCar: (car) => {
    //   return dispatch(deleteCar(car));
    // },
    _clearMessages: () => {
      return dispatch(clearMessages());
    },
    _addPackageToCar: (data) => {
      return dispatch(addPackageToCar(data));
    },
    _getPackages: () => {
      return dispatch(getPackages());
    },
    _removeFromCar: (data) => {
      return dispatch(removeFromCar(data));
    },
    _getAvailablePackages: (id) => {
      return dispatch(getAvailablePackages(id));
    }
  };
};

Cars.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      registrationNumber: PropTypes.string,
      status: PropTypes.string,
    })
  ),
  _getCars: PropTypes.func,
  _addCar: PropTypes.func,
  _editCar: PropTypes.func,
  _deleteCar: PropTypes.func,
  isLoading: PropTypes.bool,
};


export default connect(mapStateToProps, mapDispatchToProps)(Cars);
