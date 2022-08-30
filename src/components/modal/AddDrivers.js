import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { addDrivers } from "../../redux/drivers.slice";
import "../../style/common.css";
import { nanoid } from "nanoid";
import { Formik } from "formik";
import * as Yup from "yup";

const driverSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required!")
    .min(2, "Too short!")
    .matches(/^[A-Za-z- ]*$/, "Please enter a valid name"),
  phoneNumber: Yup.string()
    .required("Required!")
    .min(2, "Too short!")
    .matches(/^[0-9 +-]*$/, "Please enter a valid phone number"),
});

class AddDrivers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pack: {
        name: "",
        phoneNumber: "",
      },
    };
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Add Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <Formik
            initialValues={{
              name: "",
              phoneNumber: "",
            }}
            validationSchema={driverSchema}
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
                    <div>{errors.name}</div>
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
                    <div>{errors.phoneNumber}</div>
                  ) : null}
                </Form.Group>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="submit"
                    variant="success"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      // check if inputs are empty on submit
                      for (let value in values) {
                        if (values[value] === "") {
                          return;
                        }
                      }
                      // check if there are errors from form validation
                      if (Object.keys(errors).length !== 0) {
                        return;
                      }
                      return this.props._addDrivers({
                        guid: nanoid(),
                        name: values.name,
                        phoneNumber: values.phoneNumber,
                      });
                    }}
                  >
                    Save
                  </Button>
                  <Button variant="primary" onClick={this.props.handleClose}>
                    Close
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer className="modalFooter"></Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (store) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    _addDrivers: (pack) => {
      return dispatch(addDrivers(pack));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDrivers);
