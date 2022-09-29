import React, { Component } from "react";

import PropTypes from "prop-types";
import { Button, Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/common.css";

import {
  addPackage,
  getPackages,
  clearMessages,
  deletePackage,
  editPackage,
} from "../../redux/packages.slice";
import AddPackage from "../modal/AddPackage";
import DeletePackage from "../modal/DeletePackage";
import EditPackage from "../modal/EditPackage";
//import { nanoid } from "nanoid";

/**
 * Package model:
 *  guid
 *  senderName
 *  senderPhoneNumber
 *  departureAddress
 *  departureDate
 *  awb
 *  deliveryAddress
 *  deliveryDate // can be undefined
 *  recipientName
 *  recipientPhoneNumber
 *  carId // can be undefined
 *
 * Derived properties:
 *   => package status:
 *      sent (deliveryDate = undefined, carId = undefined)
 *      in delivery (deliveryDate = undefined, carId set)
 *      delivered (deliveryDate set, carId = undefined)
 *
 * Table columns
 *  #
 *  AWB
 *  Sender
 *  Sender Phone
 *  Departure Address
 *  Departure Date
 *  Recipient Name
 *  Recipient Phone
 *  Recipient Address
 *  Package Status
 *  Assigned to a Car - Yes / No
 */

class Packages extends Component {
  constructor(props) {
    super(props);

    this.props._getPackages();

    this.state = {
      packagef: true,
      first: false,
      showAdd: false,
      showDel: false,
      showEdit: false,
      packSelect: undefined,
      errorMessage: undefined,
    };
  }

  handleAdd = () => {
    this.setState({
      showAdd: true,
    });
  };

  handleDelete = (pack) => {
    this.setState({
      showDel: true,
      packSelect: pack,
    });
    //debugger;
  };

  handleEdit = (pack) => {
    //debugger;
    this.setState({
      showEdit: true,
      packSelect: pack,
    });
    //debugger;
  };

  componentDidMount() {
    this.retrievePackages();
  }

  retrievePackages = () => {
    if (this.props.packages.length === 0) {
      this.setState({
        errorMessage: undefined,
      });
      this.props._getPackages().then((res) => {
        if (res.error) {
          this.setState({
            errorMessage: "Error when retrieving packages",
          });
        }
        if (res.payload.length === 0) {
          this.setState({
            errorMessage: "No packages have been retrieved",
          });
        }
      });
    }
  };

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

  render() {
    return (
      <>
        {this.props.isLoading ? (
          <Spinner className="spinner" animation="border" variant="info" />
        ) : (
          <Card bg="dark" text="white" className="cardTable">
            <Card.Header
              style={{
                textAlign: "center",
              }}
            >
              <p>List of Packages</p>


            </Card.Header>
            <Card.Body style={{ textAlign: "center" }} className="cardBody">
              {this.state.errorMessage ? (
                <p className="errorText">{this.state.errorMessage}</p>
              ) : (
                <Table
                  striped
                  bordered
                  hover
                  variant="dark"
                  className="tableData"
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
                      <th>Assigned to a car</th>
                      <th>Package Status</th>

                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.packages.map((pack, i) => {
                      let packageStatus;
                      let assignedToCar;
                      if (
                        pack.deliveryDate === undefined &&
                        pack.carID === undefined
                      ) {
                        packageStatus = "sent";
                        assignedToCar = "no";
                      }
                      if (pack.deliveryDate === undefined && pack.carID) {
                        packageStatus = "in delivery";
                        assignedToCar = "yes";
                      }
                      if (pack.deliveryDate) {
                        packageStatus = "delivered";
                        assignedToCar = "no";
                      }
                      return (
                        <tr key={pack.id}>
                          <td>{i + 1}</td>
                          <td>{pack.awb}</td>
                          <td>{pack.senderName}</td>
                          <td>{pack.senderPhoneNumber}</td>
                          <td>{pack.departureAddress}</td>
                          <td>{new Date(pack.departureDate[0], pack.departureDate[1] - 1, pack.departureDate[2]).toLocaleDateString()}</td>
                          <td>{pack.recipientName}</td>
                          <td>{pack.recipientPhone}</td>
                          <td>{pack.deliveryAddress}</td>
                          <td>{assignedToCar}</td>
                          <td>{packageStatus}</td>
                          <td>
                            <Button variant="info"
                              onClick={() => {
                                this.handleEdit(pack);
                              }}
                            >
                              Edit
                            </Button>
                            &nbsp;
                            <Button
                              onClick={() => {
                                this.handleDelete(pack);
                              }}
                            >
                              &#10006;
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Card.Body>
            <Card.Footer className="cardFooter">
              <Button
                variant="success"
                onClick={this.handleAdd}
              >
                &#10010;
              </Button>
            </Card.Footer>
            {this.state.showEdit && (
              <EditPackage
                handleClose={() => {
                  this.setState({ showEdit: false, packSelect: undefined });
                }}
                _getPackages={this.props._getPackages}
                pack={this.state.packSelect}
                handleSave={(pack) => {
                  this.props._editPackage(pack).then((response) => {
                    if (!response.error) {
                      this.setState({ showEdit: false, packSelect: undefined });
                    }
                  });
                }}
              />
            )}
            {this.state.showDel && (
              <DeletePackage
                show={this.state.showDel}
                handleClose={() => {
                  this.setState({ showDel: false, packSelect: undefined });
                }}
                pack={this.state.packSelect}
                handleSave={(pack) => {
                  this.props._deletePackage(pack).then((response) => {
                    if (!response.error) {
                      this.setState({ showDel: false, packSelect: undefined });
                    }
                  });
                }}
              />
            )}
            {this.state.showAdd && (
              <AddPackage
                handleClose={() => {
                  this.setState({ showAdd: false });
                }}
                show={this.state.showAdd}
                handleSave={(pack) => {
                  this.props._addPackage(pack).then((response) => {
                    if (!response.error) {
                      this.setState({ showAdd: false });
                    }
                  });
                }}
              />
            )}
          </Card>
        )}
        <ToastContainer theme="dark" />
      </>
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
    _getPackages: () => {
      return dispatch(getPackages());
    },
    _addPackage: (pack) => {
      return dispatch(addPackage(pack));
    },
    _deletePackage: (pack) => {
      return dispatch(deletePackage(pack));
    },
    _editPackage: (pack) => {
      return dispatch(editPackage(pack));
    },
    _clearMessages: () => {
      return dispatch(clearMessages());
    },
  };
};

Packages.propTypes = {
  packages: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number,
      senderName: PropTypes.string,
      senderPhoneNumber: PropTypes.string,
      departureAddress: PropTypes.string,
      departureDate: PropTypes.array,
      awb: PropTypes.string,
      deliveryAddress: PropTypes.string,
      deliveryDate: PropTypes.array,
      recipientName: PropTypes.string,
      recipientPhone: PropTypes.string,
      customerId: PropTypes.number,
      carId: PropTypes.number,
      packageStatus: PropTypes.string,
      assignedToCar: PropTypes.string,
    })
  ),
  _getPackages: PropTypes.func,
  _addPackage: PropTypes.func,
  _clearMessages: PropTypes.func,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Packages);
