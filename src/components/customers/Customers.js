import React, { Component } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import "react-toastify/dist/ReactToastify.css";
import Card from "react-bootstrap/Card";
import "../../style/common.css";
import { getCustomers } from "../../redux/customers.slice";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

class Customers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errorMessage: undefined,
    };
  }

  componentDidMount() {
    this.retrieveCustomers();
  }

  retrieveCustomers = () => {
    if (this.props.customers.length === 0) {
      this.setState({
        errorMessage: undefined,
      });
      this.props._getCustomers().then((res) => {
        if (res.error) {
          this.setState({
            errorMessage: "Error when retrieving packages",
          });
        }
        if (res.payload.length === 0) {
          this.setState({
            errorMessage: "No customers have been retrieved",
          });
        }
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevProps.errorMessage && this.props.errorMessage) {
      toast.error(this.props.errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      //this.props._clearMessages();
    }

    if (!prevProps.successMessage && this.props.successMessage) {
      toast.success(this.props.successMessage, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });

      //this.props._clearMessages();
    }
  }

  render() {
    return (
      <>
        {this.props.isLoading ? (
          <Spinner className="spinner" animation="border" variant="info" />
        ) : (
          <Card bg="dark" text="white" className="cardTable">
            <Card.Header style={{ textAlign: "center" }}>
              <p>List of Customers</p>
            </Card.Header>
            <Card.Body style={{ textAlign: "center" }} className="cardBody">
              {this.state.errorMessage ? (
                <p className="errorText">{this.state.errorMessage}</p>
              ) : (
                <Table className="tableData"
                  striped
                  bordered
                  hover
                  variant="dark" >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Address</th>
                      <th>Phone number</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.customers.map((customer, i) => {
                      return (<tr key={customer.id}>
                        <td>{i + 1}</td>
                        <td>{customer.name}</td>
                        <td>{customer.address}</td>
                        <td>{customer.phoneNumber}</td>
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
    )
  }
}

const mapStateToProps = (store) => {
  return {
    ...store.customers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _getCustomers: () => {
      return dispatch(getCustomers());
    },
  };
};

Customers.porpTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      address: PropTypes.string,
      phoneNumber: PropTypes.string,
    })
  ),
  _getCustomers: PropTypes.func,
};
//export default Customers;
export default connect(mapStateToProps, mapDispatchToProps)(Customers);