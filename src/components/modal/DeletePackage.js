import React,{Component} from "react";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';
//import { deletePackage } from "../../redux/packages.slice";
//import { connect } from "react-redux";

class DeletePackage extends Component {
  constructor(props) {
    super(props);

     this.state = {
      pack: {
        ...this.props.pack,
      },
    };
  }

  render() {
    return (
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Package</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
          <Button variant="primary" onClick={()=>{this.props.handleSave(this.state.pack)}}>
            Delete
          </Button>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
        </Modal>
    );
  }
}


export default DeletePackage;

//export default DeletePackage;
