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
  deleteCar,
  clearMessages,
} from "../../redux/cars.slice";
import AddOrEditCar from "../modal/AddOrEditCar";
import DeleteCar from "../modal/DeleteCar";
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
      showDeleteCar: false,
      carSelectedForDelete: undefined,
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

  onCloseAddOrEditModal = () => {
    this.setState({
      showAddOrEditModal: false,
      carSelectedForEdit: undefined,
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
                                onClick={() => {
                                  this.onDelete(car);
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
              {this.state.showDeleteCar && (
                <DeleteCar
                  show={this.state.showDeleteCar}
                  handleClose={() => this.setState({ showDeleteCar: false, carSelectedForDelete: undefined })}
                  car={this.state.carSelectedForDelete}
                  handleSave={(car) => {
                    this.props._deleteCar(car).then((response) => {
                      if (!response.error) {
                        this.setState({ showDeleteCar: false, carSelectedForDelete: undefined })
                      }
                    })

                  }}
                />
              )};
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
    _deleteCar: (car) => {
      return dispatch(deleteCar(car));
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
  _addCar: PropTypes.func,
  _editCar: PropTypes.func,
  _deleteCar: PropTypes.func,
  isLoading: PropTypes.bool,
};


export default connect(mapStateToProps, mapDispatchToProps)(Cars);
