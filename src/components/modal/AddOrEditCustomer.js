import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../style/common.css"
import { Formik } from "formik";
import * as Yup from "yup";

const customerSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required!")
    .min(2, "Too short!")
    .matches(/^[A-Za-z- ]*$/, "Please enter a valid name"),
  address: Yup.string()
    .required("Required!")
    .min(2, "Too short!")
    .matches(/^[A-Za-z-0-9 ]*$/, "Please enter a valid name"),
  phoneNumber: Yup.string()
    .required("Required!")
    .min(2, "Too short!")
    .matches(/^[0-9 +-]*$/, "Please enter a valid phone number"),
});


class AddOrEditCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: {
        ...this.props.customer,
      },
    };
  }

  render() {
    return (
      <Modal backdrop={'static'} show={true} onHide={this.props.handleClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          {this.props.isLoading ? (
            <div>Saving customer...</div>
          ) : (
            <Formik
              initialValues={{
                ...this.state.customer
              }}
              validationSchema={customerSchema}
              onSubmit={(values) => {
                return this.props.handleSave(values
                );
              }}
            >
              {({
                handleSubmit,
                handleChange,
                values,
                touched,
                isValid,
                errors,
              }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={values.name}
                      isValid={touched.name && !errors.name}
                      onChange={handleChange}
                    />
                    {errors.name && touched.name ? (
                      <div className="errorDiv">{errors.name}</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={values.address}
                      isValid={touched.address && !errors.address}
                      onChange={handleChange}
                    />
                    {errors.address && touched.address ? (
                      <div className="errorDiv">{errors.address}</div>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPhoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      isValid={touched.phoneNumber && !errors.phoneNumber}
                      onChange={handleChange}
                    />
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <div className="errorDiv">{errors.phoneNumber}</div>
                    ) : null}
                  </Form.Group>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      disabled={this.props.isLoading}
                      type="submit"
                      variant="success"
                      style={{ marginRight: 10 }}
                    >
                      Save
                    </Button>
                    <Button disabled={this.props.isLoading} variant="primary" onClick={this.props.handleClose}>
                      Close
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </Modal.Body>
        <Modal.Footer className="modalFooter"/>
      </Modal>
    )
  }

}

export default AddOrEditCustomer;