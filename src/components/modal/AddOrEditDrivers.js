import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { uuid4 } from "uuid4";
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


class AddOrEditDrivers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            driver: {
                ...this.props.driver,
            },
        };
    }

    render() {
        return (
            <Modal backdrop={'static'} show={true} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {this.props.isLoading ? (
                        <div>Saving driver...</div>
                    ) : (
                        <Formik
                            initialValues={{
                                name: "",
                                phoneNumber: "",
                            }}
                            validationSchema={driverSchema}
                            onSubmit={(values) => {
                                return this.props._addDrivers({
                                    guid: uuid4(),
                                    name: values.name,
                                    phoneNumber: values.phoneNumber,
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
                <Modal.Footer>
                    <Button
                        disabled={this.props.isLoading}
                        variant="primary"
                        onClick={() => this.props.handleClose()}
                    >
                        Close
                    </Button>
                    <Button
                        disabled={this.props.isLoading}
                        variant="success"
                        onClick={() => this.props.handleSave(this.state.driver)}
                    >
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

AddOrEditDrivers.propTypes = {
    driver: PropTypes.exact({
        guid: PropTypes.string.isRequired,
        name: PropTypes.string,
        phoneNumber: PropTypes.string,
        status: PropTypes.string,
    }),
    handleClose: PropTypes.func,
    handleSave: PropTypes.func,
    title: PropTypes.string,
    isLoading: PropTypes.bool,
};

export default AddOrEditDrivers;
