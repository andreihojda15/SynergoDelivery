import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { addPackage } from "../../redux/packages.slice";
import { uuid4 } from "uuid4";
import "../../style/common.css";
import { Formik } from "formik";
import * as Yup from "yup";

const packageSchema = Yup.object().shape({
  awb: Yup.number()
    .typeError("AWB must be a number!")
    .required("Required!")
    .min(2, "Too short!"),
  senderName: Yup.string()
    .required("Required!")
    .min(2, "Too short!")
    .matches(/^[A-Za-z- ]*$/, "Please enter a valid name"),
  senderPhoneNumber: Yup.string()
    .required("Required!")
    .min(2, "Too short!")
    .matches(/^[0-9 +-]*$/, "Please enter a valid phone number"),
  departureAdress: Yup.string()
    .required("Required!")
    .min(2, "Too short!")
    .matches(/^[0-9A-Za-z- ]*$/, "Please enter a valid address"),
  departureDate: Yup.date().required("Required!"),
  recipientName: Yup.string()
    .required("Required!")
    .min(2, "Too short!")
    .matches(/^[A-Za-z- ]*$/, "Please enter a valid name"),
  recipientPhoneNumber: Yup.string()
    .required("Required!")
    .min(2, "Too short!")
    .matches(/^[0-9 +-]*$/, "Please enter a valid phone number"),
  deliveryAdress: Yup.string()
    .required("Required!")
    .min(2, "Too short!")
    .matches(/^[0-9A-Za-z- ]*$/, "Please enter a valid address"),
});

class AddPackage extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Add Package</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <Formik
            initialValues={{
              awb: "",
              senderName: "",
              senderPhoneNumber: "+1",
              departureAdress: "",
              departureDate: "",
              recipientName: "",
              recipientPhoneNumber: "",
              deliveryAdress: "",
            }}
            validationSchema={packageSchema}
            onSubmit={(values) => {
              return this.props._addPackage({
                guid: uuid4(),
                awb: values.awb,
                senderName: values.senderName,
                senderPhoneNumber: values.senderPhoneNumber,
                departureAdress: values.departureAdress,
                departureDate: new Date(
                  values.departureDate
                ).toLocaleDateString(),
                recipientName: values.recipientName,
                recipientPhoneNumber: values.recipientPhoneNumber,
                deliveryAdress: values.deliveryAdress,
              });
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
                <Form.Group className="mb-3" controlId="formAWB">
                  <Form.Label>AWB</Form.Label>
                  <Form.Control
                    type="text"
                    name="awb"
                    value={values.awb}
                    onChange={handleChange}
                    isValid={touched.awb && !errors.awb}
                    placeholder="AWB"
                  />
                  {errors.awb && touched.awb ? (
                    <div className="errorDiv">{errors.awb}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSender">
                  <Form.Label>Sender</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Sender"
                    name="senderName"
                    value={values.senderName}
                    isValid={touched.senderName && !errors.senderName}
                    onChange={handleChange}
                  />
                  {errors.senderName && touched.senderName ? (
                    <div className="errorDiv">{errors.senderName}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSenderPhone">
                  <Form.Label>Sender Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="senderPhoneNumber"
                    value={values.senderPhoneNumber}
                    isValid={
                      touched.senderPhoneNumber && !errors.senderPhoneNumber
                    }
                    onChange={handleChange}
                  />
                  {errors.senderPhoneNumber && touched.senderPhoneNumber ? (
                    <div className="errorDiv">{errors.senderPhoneNumber}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDepatureAddress">
                  <Form.Label>Departure Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Departure"
                    name="departureAdress"
                    value={values.departureAdress}
                    isValid={touched.departureAdress && !errors.departureAdress}
                    onChange={handleChange}
                  />
                  {errors.departureAdress && touched.departureAdress ? (
                    <div className="errorDiv">{errors.departureAdress}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDepDate">
                  <Form.Label>Departure Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date"
                    name="departureDate"
                    value={values.departureDate}
                    isValid={touched.departureDate && !errors.departureDate}
                    onChange={handleChange}
                  />
                  {errors.departureDate && touched.departureDate ? (
                    <div className="errorDiv">{errors.departureDate}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRepicName">
                  <Form.Label>Recipient Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="recipientName"
                    value={values.recipientName}
                    isValid={touched.recipientName && !errors.recipientName}
                    onChange={handleChange}
                  />
                  {errors.recipientName && touched.recipientName ? (
                    <div className="errorDiv">{errors.recipientName}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRepicPhone">
                  <Form.Label>Recipient Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="recipientPhoneNumber"
                    value={values.recipientPhoneNumber}
                    isValid={
                      touched.recipientPhoneNumber &&
                      !errors.recipientPhoneNumber
                    }
                    onChange={handleChange}
                  />
                  {errors.recipientPhoneNumber &&
                  touched.recipientPhoneNumber ? (
                    <div className="errorDiv">
                      {errors.recipientPhoneNumber}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRepicAddress">
                  <Form.Label>Recipient Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    name="deliveryAdress"
                    value={values.deliveryAdress}
                    isValid={touched.deliveryAdress && !errors.deliveryAdress}
                    onChange={handleChange}
                  />
                  {errors.deliveryAdress && touched.deliveryAdress ? (
                    <div className="errorDiv">{errors.deliveryAdress}</div>
                  ) : null}
                </Form.Group>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    type="submit"
                    variant="success"
                    style={{ marginRight: 10 }}
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
      </Modal>
    );
  }
}
const mapStateToProps = (store) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    _addPackage: (pack) => {
      return dispatch(addPackage(pack));
    },
  };
};

AddPackage.propTypes = {
  _addPackage: PropTypes.func,
  handleClose: PropTypes.func,
  show: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPackage);
