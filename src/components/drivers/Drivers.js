import React, { Component } from "react";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";

import {
  getDrivers, addDrivers
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
  }

  render() {
    return (
      <>
        {
          this.props.isLoading ?
            <div>Please wait! Loading drivers...</div> :
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.drivers.map((item, i) => (
                    <tr key={item.guid}>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.phoneNumber}</td>
                      <td>{item.carId ? "Busy" : "Available"}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
        }
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
    _addDrivers: (pack) => {
      return dispatch(addDrivers(pack));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Drivers);
