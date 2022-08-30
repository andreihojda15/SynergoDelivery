import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import "./Drivers.css";
import DeleteDrivers from "../modal/DeleteDrivers";
import EditDrivers from "../modal/EditDrivers";
import {
  getDrivers, addDrivers, editDrivers, deleteDrivers, clearMessages,
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

    this.state = {
      showDelete: false,
      showEdit: false
    };
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

  handleDelete = () => {
    this.setState({ showDelete: !this.state.showDelete });
  }

  handleEdit = () => {
    this.setState({ showEdit: !this.state.showEdit });
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.props.drivers.map((item, i) => (
                  <tr key={item.guid}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.carId ? "Busy" : "Available"}</td>
                    <td>
                      <Button variant="secondary" onClick={this.handleEdit}>Edit</Button>
                      <EditDrivers show={this.state.showEdit} handleClose={this.handleEdit} />

                      <Button onClick={this.handleDelete}>Delete</Button>
                      <DeleteDrivers show={this.state.showDelete} handleClose={this.handleDelete} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}
        <ToastContainer theme="dark" />
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
    _editDrivers: (pack) => {
      return dispatch(editDrivers(pack));
    },
    _deleteDrivers: (pack) => {
      return dispatch(deleteDrivers(pack));
    },
    _clearMessages: () => {
      return dispatch(clearMessages());
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
