import React, { Component } from "react";
import { Table } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Package.css";

import {
  addPackage,
  getPackages,
  clearMessages,
} from "../../redux/packages.slice";

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

  render() {
    return (
      <>
        {this.props.isLoading ? (
          <Spinner className="spinner" animation="border" variant="info" />
        ) : (
          <>
            <Card bg="dark" text="white" className="cardTable">
              <Card.Header style={{ textAlign: "center" }}>
                List of Packages
              </Card.Header>
              <Table striped bordered hover variant="dark">
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
                    if (p.deliveryDate === undefined && p.carID === undefined) {
                      packageStatus = "sent";
                      assignedToCar = "no";
                    }
                    if (p.deliveryDate === undefined && p.carID) {
                      packageStatus = "in delivery";
                      assignedToCar = "yes";
                    }
                    if (p.deliveryDate) {
                      packageStatus = "delivered";
                      assignedToCar = "no";
                    }

                    return (
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
                        <td>{assignedToCar}</td>
                        <td>{packageStatus}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Packages);
