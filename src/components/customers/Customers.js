import React, { Component } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import Table from "react-bootstrap/Table";
import "react-toastify/dist/ReactToastify.css";
import Card from "react-bootstrap/Card";
import "../../style/common.css";
import { addCustomer, editCustomer, getCustomers, deleteCustomer } from "../../redux/customers.slice";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import { Button } from "react-bootstrap";
import DeleteCustomer from "../../components/modal/DeleteCustomer";
import AddOrEditCustomer from "../../components/modal/AddOrEditCustomer";
import uuid4 from "uuid4";

class Customers extends Component {

  constructor(props) {
    super(props);

    this.state = {
      errorMessage: undefined,
      showAddOrEditModal: false,
      showDeleteModal: false,
      customerSelectedForDelete: undefined,
      customerSelectedForEdit: undefined,
    };
  }

  retrieveCustomers = () => {
    if (this.props.customers.length === 0) {
      this.setState({
        errorMessage: undefined,
      });
      this.props._getCustomers().then((res) => {
        if (res.error) {
          this.setState({
            errorMessage: "Error when retrieving customers",
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



  componentDidMount() {
    this.retrieveCustomers();
  };




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

  AddCustomer = () => {
    this.setState({
      showAddOrEditModal: true,
      customerSelectedForEdit: undefined,
    });
  };

  EditCustomer = (customer) => {
    this.setState({
      showAddOrEditModal: true,
      customerSelectedForEdit: {
        id: customer.id,
        name: customer.name,
        address: customer.address,
        phoneNumber: customer.phoneNumber,
      },
    });
  };

  DeleteCustomer = (customer) => {
    this.setState({
      showDeleteModal: true,
      customerSelectedForDelete: customer
    });
  };

  onCloseAddOrEditCustomer() {
    this.setState({
      showAddOrEditModal: false,
      customerSelectedForEdit: undefined,
    });
  };

  onCloseDeleteCustomer() {
    this.setState({
      showDeleteModal: false,
      customerSelectedForDelete: undefined,
    });
  };

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
                        <td>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                              this.EditCustomer(customer);
                            }}>
                            Edit
                          </Button>{" "}
                          &nbsp;{" "}
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => {
                              this.DeleteCustomer(customer);
                            }}>
                            Delete
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
                onClick={this.AddCustomer}
              >
                &#10010;
              </Button>
            </Card.Footer>
            {this.state.showAddOrEditModal && (
              <AddOrEditCustomer
                isLoading={this.props.isEditingCustomer}
                //handleClose={this.onCloseAddOrEditCustomer}
                handleClose = {() => {
                  this.setState({
                    showAddOrEditModal : false,
                    customerSelectedForEdit: undefined,
                  })
                }}
                customer={
                  this.state.customerSelectedForEdit ?? {
                    id: uuid4(),
                    name: "",
                    address: "",
                    phoneNumber: "",
                    status: "",
                  }
                }
                title={this.state.customerSelectedForEdit ? "Edit customer" : "Add customer"}
                handleSave={(customer) => {
                  this.state.customerSelectedForEdit
                    ? this.props._editCustomers(customer).then((response) => {
                      if (!response.error) {
                        this.onCloseAddOrEditCustomer();
                      }
                    })
                    : this.props._addCustomers(customer).then((response) => {
                      if (!response.error) {
                        this.onCloseAddOrEditCustomer();
                      }
                    });
                }}
              />
            )}

            {this.state.showDeleteModal && (
              <DeleteCustomer
                //handleClose={this.onCloseDeleteCustomer}
                handleClose={() => {
                  this.setState({
                    showDeleteModal: false,
                    customerSelectedForDelete: undefined,
                  });
                }}
                customer={this.state.customerSelectedForDelete}
                handleSave={(customer) => {
                  this.props._deleteCustomers(customer).then((response) => {
                    if (!response.error) {
                      this.onCloseDeleteCustomer();
                    }
                  })
                }}
              />)}
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
    _addCustomers: (customer) => {
      return dispatch(addCustomer(customer));
    },
    _editCustomers: (customer) => {
      return dispatch(editCustomer(customer));
    },
    _deleteCustomers: (customer) => {
      console.log(customer);
      return dispatch(deleteCustomer(customer));
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
  _addCustomers: PropTypes.func,
  _editCustomers: PropTypes.func,
  _deleteCustomers: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);