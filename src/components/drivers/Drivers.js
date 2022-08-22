import React from "react";
import { Table } from "react-bootstrap";

/**
 * Driver model:
 *  guid
 *  name
 *  phoneNumber
 *  carId // car guid, can be undefined => status: busy / available
 *
 *  Table columns
 *  #
 *  Name
 *  Phone number
 *  Status
 */

class Drivers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      drivers: [
        {
          guid: "eb3aebe1-e3ee-4524-b87b-d62fd7f3ba71",
          name: "Mihai Popescu",
          phoneNumber: "0773546223",
          carId: "d1c51f3b-f13f-407f-b6e2-46c5bbc747ad",
        },
        {
          guid: "813a7c01-ea18-4962-b152-71efcb5c2b05",
          name: "Jack Sparrow",
          phoneNumber: "0774387543",
          carId: "62ee4afa-b261-4f0a-9581-386cf9e0c4c0",
        },
        {
          guid: "5f93d951-1dc6-4632-86dd-7b6b3fc51191",
          name: "Ion Ion",
          phoneNumber: "0773555876",
          carId: "c1f0c515-4862-434c-91bb-b477504f5161",
        },
        {
          guid: "7f71a066-74b6-43c8-bda3-8a6fe4fc1ed9",
          name: "Ilie Papadie",
          phoneNumber: "0773434666",
          carId: "0e063045-c96a-4d34-8cc5-4ca2223616dc",
        },
        {
          guid: "1dfdfb6e-8791-4766-8fe4-9973b965e1ac",
          name: "Tomy Motan",
          phoneNumber: "0773433985",
          carId: "49ce9298-161a-4a04-82c0-31640f05dc31",
        },
        {
          guid: "602ee2fa-e319-41aa-aac9-9ebad9d21c56",
          name: "Gigi Negru",
          phoneNumber: "0773322546",
          carId: "be37bda1-0b19-43da-b874-ac359926737c",
        },
        {
          guid: "fc80d8f4-d2c3-460d-8596-fb26d41df3d8",
          name: "Adrian Avram",
          phoneNumber: "0773775634",
          carId: "80575920-8b09-42be-90ae-e7000e9c0384",
        },
        {
          guid: "0bc15d56-f542-4228-802b-6ed877b87474",
          name: "Dan Georgescu",
          phoneNumber: "0773999444",
          carId: "bad6d196-a0f1-47bb-8e95-69ace085bcee",
        },
        {
          guid: "6a0ee78b-f782-47e7-b178-af373cfa159b",
          name: "Octavian Marinescu",
          phoneNumber: "0773664488",
          carId: undefined,
        },
        {
          guid: "329568b3-e130-4515-95ef-91cba734f52c",
          name: "Grigore Savu",
          phoneNumber: "0773338644",
          carId: undefined,
        },
      ],
    };
  }

  render() {
    return (
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {this.state.drivers.map((item, i) => (
            <tr key={item.guid}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.carId ? "Available" : "Busy"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default Drivers;
