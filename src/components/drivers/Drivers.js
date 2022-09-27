import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import "../../style/common.css";
import { getDrivers, addDrivers } from "../../redux/drivers.slice";

/**
 * Driver model:
 *  id
 *  name
 *  phoneNumber
 *  carId // car id, can be undefined => status: busy / available
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

    this.state = {
      errorMessage: undefined,
    };
  }

  componentDidMount() {
    this.retrieveDrivers();
  }

  retrieveDrivers = () => {
    if (this.props.drivers.length === 0) {
      this.setState({
        errorMessage: undefined,
      });
      this.props._getDrivers().then((res) => {
        if (res.error) {
          this.setState({
            errorMessage: "Error when retrieving drivers",
          });
        }
        if (res.payload.length === 0) {
          this.setState({
            errorMessage: "No drivers have been retrieved",
          });
        }
      });
    }
  };

  render() {
    return (
      <>
        {this.props.isLoading ? (
          <Spinner className="spinner" animation="border" variant="info" />
        ) : (
          <>
            <Card bg="dark" text="white" className="cardTable">
              <Card.Header style={{ textAlign: "center" }}>
                List of Drivers
              </Card.Header>
              <Card.Body style={{ textAlign: "center" }} className="cardBody">
                {this.state.errorMessage ? (
                  <p className="errorText">{this.state.errorMessage}</p>
                ) : (
                  <>
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
                          <th>Name</th>
                          <th>Phone Number</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.props.drivers.map((item, i) => (
                          <tr key={item.id}>
                            <td>{i + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.carId ? "Busy" : "Available"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </>
                )}
              </Card.Body>
            </Card>
          </>
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
    _addDrivers: (pack) => {
      return dispatch(addDrivers(pack));
    },
  };
};

Drivers.propTypes = {
  drivers: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      phoneNumber: PropTypes.string,
      carId: PropTypes.string,
    })
  ),
  _getDrivers: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Drivers);
