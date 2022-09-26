import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import "../../style/common.css";
import { Formik } from "formik";
import * as Yup from "yup";

const carSchema = Yup.object().shape({
  registrationNumber: Yup.string()
    .required("Required!")
    .min(2, "Too short!")
    .matches(/^[A-Z0-9  ]*$/, "Please enter a valid registration number"),
  status: Yup.string()
    .required("Required!")
    .oneOf(
      ["Available", "Not Available"],
      "Status must be either Available or Not Available"
    ),
});

class AddOrEditCar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      car: {
        ...this.props.car,
      },
    };
  }

  render() {
    return (
      <Modal backdrop={"static"} show={true} onHide={this.props.handleClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          {this.props.isLoading ? (
            <div>Saving car...</div>
          ) : (
            <Formik
              initialValues={{
                ...this.state.car,
              }}
              validationSchema={carSchema}
              onSubmit={(values) => {
                return this.props.handleSave(values);
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
                  <Form.Group className="mb-3" controlId="formRegistration">
                    <Form.Label>Registration Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="registrationNumber"
                      value={values.registrationNumber}
                      isValid={
                        touched.registrationNumber && !errors.registrationNumber
                      }
                      onChange={handleChange}
                      placeholder="Registration number"
                    />
                    {errors.registrationNumber && touched.registrationNumber ? (
                      <div className="errorDiv">
                        {errors.registrationNumber}
                      </div>
                    ) : null}
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formSender">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="status"
                      name="status"
                      value={values.status}
                      isValid={touched.status && !errors.status}
                      onChange={handleChange}
                    />
                    {errors.status && touched.status ? (
                      <div className="errorDiv">{errors.status}</div>
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
                    <Button
                      disabled={this.props.isLoading}
                      variant="primary"
                      onClick={() => this.props.handleClose()}
                    >
                      Close
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

AddOrEditCar.propTypes = {
  car: PropTypes.exact({
    guid: PropTypes.string.isRequired,
    registrationNumber: PropTypes.string,
    status: PropTypes.string,
    packageIds: PropTypes.arrayOf(PropTypes.string),
  }),
  handleClose: PropTypes.func,
  handleSave: PropTypes.func,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default AddOrEditCar;
