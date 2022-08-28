import React from "react";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { getCars } from "../../redux/cars.slice";
import { connect } from "react-redux";
import "./Cars.css";
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
    this.props._getCars();
  }

  render() {
    return (
      <>
        {this.props.isLoading ? (
          <Spinner className="spinner" animation="border" variant="info" />
        ) : (
          <Table className="table" striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                <th>Registration number</th>
                <th>Status</th>
                <th>Number of Packages</th>
                <th>Assigned to a Driver</th>
              </tr>
            </thead>
            <tbody>
              {this.props.cars.map((car, i) => (
                <tr key={car.guid}>
                  <td>{i + 1}</td>
                  <td>{car.registrationNumber}</td>
                  <td>{car.status}</td>
                  <td>{car.packageIds.length}</td>
                  <td>{car.driverId ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cars);
