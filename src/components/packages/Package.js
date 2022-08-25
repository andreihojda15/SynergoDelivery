import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { addPackage, getPackages } from "../../redux/packages.slice";

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

  render() {
    if (this.props.isError) {
      toast.error("bad");
    } else toast.success("good");
    return (
      <>
        {this.props.isLoading ? (
          <div>Please wait! Loading packages...</div>
        ) : (
          <>
            <ToastContainer />
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
          </>
        )}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Packages);
