// import React, { Component } from "react";
// import { ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";


// class DeleteDriver extends Component{
//     constructor(props){
//         super(props);

//         this.state = {
//             driver:{
//                 ...this.props.driver,
//             }
//         };
//     }

// render(){
//     return(
//         <Modal show={true} onHide={this.props.handleClose}>
//          <ModalHeader closeButton>
//             <ModalTitle>Delete Driver</ModalTitle>
//          </ModalHeader>
//          <ModalFooter>
//             <Button variant="primary" onClick={()=>{this.props.handleSave(this.state.driver)}}>
//                 Delete
//             </Button>
//             <Button variant="secondary" onClick={this.props.handleClose()}>
//                 Cancel
//             </Button>
//          </ModalFooter>
//         </Modal>
//     );
// }
// }


// export default DeleteDriver;