import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import "./Drivers.css";

import { getDrivers } from "../../redux/drivers.slice";

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
        {this.props.isLoading ? (
          <Spinner className="spinner" animation="border" variant="info" />
        ) : (
          <Card bg="dark" text="white" className="cardTable">
            <Card.Header style={{ textAlign: "center" }}>
              List of Drivers
            </Card.Header>
            <Table className="table" striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {this.props.drivers.map((item, i) => (
                  <tr key={item.guid}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.carId ? "Busy" : "Available"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}
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
  };
};

Drivers.propTypes = {
  drivers: PropTypes.arrayOf(
    PropTypes.exact({
      guid: PropTypes.string,
      name: PropTypes.string,
      phoneNumber: PropTypes.string,
      carId: PropTypes.string,
    })
  ),
  _getDrivers: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drivers);
