import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { deleteCar } from "../../redux/cars.slice";
import { connect } from "react-redux";

class DeleteCar extends React.Component {
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
                <Modal.Header closeButton>
                    <Modal.Title>
                        Delete Car
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.props.handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="success"
                        onClick={() => {
                            return this.props._deleteCar(this.state.car);
                        }}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        );
    }
}
const mapStateToProps = (store) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        _deleteCar: (car) => {
            return dispatch(deleteCar(car));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCar);
