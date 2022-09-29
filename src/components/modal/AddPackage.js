import { Formik } from "formik";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import * as Yup from "yup";
import { getCustomers } from "../../redux/customers.slice";
import { getDrivers } from "../../redux/drivers.slice";
import { addPackage } from "../../redux/packages.slice";
import "../../style/common.css";

const packageSchema = Yup.object().shape({
  awb: Yup.number()
    .typeError("AWB must be a number!")
    .required("Required!")
    .min(2, "Too short!"),
  senderName: Yup.string()
    .required("Required!")
    .min(2, "Too short!")
    .notOneOf(['Choose sender name'], 'You must choose a sender name')
    .matches(/^[A-Za-z- ]*$/, "Please enter a valid name"),
  senderPhoneNumber: Yup.string()
    .required("Required!")
    .min(5, "Too short!")
    .max(15, 'Phone number is too long')
    .test('US Prefix', 'Phone number must start with US prefix (+1)', (value) =>
      value.startsWith('+1') && value.charAt(2) === ' '
    )
    .matches(/^[0-9 +-]*$/, "Please enter a valid phone number"),
  departureAddress: Yup.string()
    .required("Required!")
    .min(2, "Too short!")
    .matches(/^[0-9A-Za-z- ]*$/, "Please enter a valid address"),
  departureDate: Yup.date()
    .required("Required!"),
  recipientName: Yup.string()
    .required("Required!")
    .min(2, "Too short!")
    .notOneOf(['Choose recipient name'], 'You must choose a recipient name')
    .matches(/^[A-Za-z- ]*$/, "Please enter a valid name"),
  recipientPhone: Yup.string()
    .required("Required!")
    .min(5, "Too short!")
    .max(15, 'Phone number is too long')
    .test('US Prefix', 'Phone number must start with US prefix (+1)', (value) =>
      value.startsWith('+1') && value.charAt(2) === ' '
    )
    .matches(/^[0-9 +-]*$/, "Please enter a valid phone number"),
  deliveryAddress: Yup.string()
    .required("Required!")
    .min(2, "Too short!")
    .matches(/^[0-9A-Za-z- ]*$/, "Please enter a valid address"),
  deliveryDate: Yup.date()
    .min(Yup.ref('departureDate'), `Delivery date can't be earlier than departure date.`)
    .required("Required!"),
});

class AddPackage extends Component {
  componentDidMount() {
    this.props._getDrivers();
    this.props._getCustomers();
  }

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
              departureAddress: "",
              departureDate: moment().format('YYYY-MM-DD'),
              recipientName: "",
              recipientPhone: "+1",
              deliveryAddress: "",
              deliveryDate: moment().format('YYYY-MM-DD'),
            }}
            validationSchema={packageSchema}
            onSubmit={(values) => {
              return this.props.handleSave({
                ...values,
                departureDate: values.departureDate.split('-'),
              })
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
                  <Form.Select
                    name="senderName"
                    className="mb-3"
                    aria-label="Sender name select box"
                    value={values.senderName}
                    isValid={touched.senderName && !errors.senderName}
                    onChange={handleChange}
                  >
                    <option>Choose sender name</option>
                    {this.props.drivers.map((driver) => {
                      return <option key={driver.id} value={driver.name}>{driver.name}</option>
                    })}
                  </Form.Select>
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
                    name="departureAddress"
                    value={values.departureAddress}
                    isValid={touched.departureAddress && !errors.departureAddress}
                    onChange={handleChange}
                  />
                  {errors.departureAddress && touched.departureAddress ? (
                    <div className="errorDiv">{errors.departureAddress}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDepDate">
                  <Form.Label>Departure Date</Form.Label>
                  <Form.Control
                    type="date"
                    min={moment(new Date()).format('YYYY-MM-DD')}
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
                <Form.Group className="mb-3" controlId="formRecipName">
                  <Form.Label>Recipient Name</Form.Label>
                  <Form.Select
                    className="mb-3"
                    aria-label="Sender name select box"
                    name="recipientName"
                    value={values.recipientName}
                    isValid={touched.recipientName && !errors.recipientName}
                    onChange={handleChange}
                  >
                    <option>Choose recipient name</option>
                    {this.props.customers.map((driver) => {
                      return <option key={driver.id} value={driver.name}>{driver.name}</option>
                    })}
                  </Form.Select>
                  {errors.recipientName && touched.recipientName ? (
                    <div className="errorDiv">{errors.recipientName}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRepicPhone">
                  <Form.Label>Recipient Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone"
                    name="recipientPhone"
                    value={values.recipientPhone}
                    isValid={
                      touched.recipientPhone &&
                      !errors.recipientPhone
                    }
                    onChange={handleChange}
                  />
                  {errors.recipientPhone &&
                    touched.recipientPhone ? (
                    <div className="errorDiv">
                      {errors.recipientPhone}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRepicAddress">
                  <Form.Label>Recipient Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    name="deliveryAddress"
                    value={values.deliveryAddress}
                    isValid={touched.deliveryAddress && !errors.deliveryAddress}
                    onChange={handleChange}
                  />
                  {errors.deliveryAddress && touched.deliveryAddress ? (
                    <div className="errorDiv">{errors.deliveryAddress}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDepDate">
                  <Form.Label>Delivery Date</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="Date"
                    min={moment(new Date()).format('YYYY-MM-DD')}
                    name="deliveryDate"
                    value={values.deliveryDate}
                    isValid={touched.deliveryDate && !errors.deliveryDate}
                    onChange={handleChange}
                  />
                  {errors.deliveryDate && touched.deliveryDate ? (
                    <div className="errorDiv">{errors.deliveryDate}</div>
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
  return {
    ...store.drivers,
    ...store.customers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    _addPackage: (pack) => {
      return dispatch(addPackage(pack));
    },
    _getDrivers: () => {
      return dispatch(getDrivers());
    },
    _getCustomers: () => {
      return dispatch(getCustomers());
    }
  };
};

AddPackage.propTypes = {
  _addPackage: PropTypes.func,
  handleClose: PropTypes.func,
  show: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPackage);
