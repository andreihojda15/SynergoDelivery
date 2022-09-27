import React from "react";
import { Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { deleteCar } from "../../redux/cars.slice";

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
				<Modal.Header closeButton className="modalHeader">
					<Modal.Title>
						Delete Car
					</Modal.Title>
				</Modal.Header>
				<Modal.Footer style={{
					display: 'flex',
					justifyContent: 'center',
				}} className="modalFooter">
					{this.props.isDeletedCar ?
						<Spinner className="spinner" animation="border" variant="info" /> :
						<>
							<Button variant="success" onClick={this.props.handleClose}>
								Close
							</Button>
							<Button
								variant="primary"
								onClick={() => {
									return this.props._deleteCar(this.state.car);
								}}
							>
								Delete
							</Button>
						</>
					}
				</Modal.Footer>
			</Modal>

		);
	}
}
const mapStateToProps = (store) => {
	return {
		...store.cars,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		_deleteCar: (car) => {
			return dispatch(deleteCar(car));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCar);
