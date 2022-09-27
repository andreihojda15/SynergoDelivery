import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
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
} from "../../redux/packages.slice";

/**
 * Package model:
 *  id
 *  senderName
 *  senderPhoneNumber
 *  departureAddress
 *  departureDate
 *  awb
 *  deliveryAddress
 *  deliveryDate // can be undefined
 *  recipientName
 *  recipientPhone
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

    this.state = {
      errorMessage: undefined,
    };
  }

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
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.packages.map((p, i) => {
                      let packageStatus;
                      let assignedToCar;
                      if (
                        p.deliveryDate === undefined &&
                        p.carId === undefined
                      ) {
                        packageStatus = "sent";
                        assignedToCar = "no";
                      }
                      if (p.deliveryDate === undefined && p.carId) {
                        packageStatus = "in delivery";
                        assignedToCar = "yes";
                      }
                      if (p.deliveryDate) {
                        packageStatus = "delivered";
                        assignedToCar = "no";
                      }
                      return (
                        <tr key={p.id}>
                          <td>{i + 1}</td>
                          <td>{p.awb}</td>
                          <td>{p.senderName}</td>
                          <td>{p.senderPhoneNumber}</td>
                          <td>{p.departureAddress}</td>
                          <td>{new Date(p.departureDate[0], p.departureDate[1], p.departureDate[2]).toLocaleDateString()}</td>
                          <td>{p.recipientName}</td>
                          <td>{p.recipientPhone}</td>
                          <td>{p.deliveryAddress}</td>
                          <td>{assignedToCar}</td>
                          <td>{packageStatus}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Card.Body>
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
    _clearMessages: () => {
      return dispatch(clearMessages());
    },
  };
};

Packages.propTypes = {
  packages: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
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
