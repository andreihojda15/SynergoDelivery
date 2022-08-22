import React, { Component } from "react";
import { Table, Stack } from "react-bootstrap";

/**
 * Package model:
 *  guid
 *  senderName
 *  senderPhoneNumber
 *  departureAddress
 *  departureDate
 *  awb
 *  deliveryAddress
 *  deliveryDate // can be undefined
 *  recipientName
 *  recipientPhoneNumber
 *  carId // can be undefined
 * 
 * Derived properties:
 *   => package status:
 *      sent (deliveryDate = undefined, carId = undefined)
 *      in delivery (deliveryDate = undefined, carId set)
 *      delivered (deliveryDate set, carId = undefined)
 */

class Packages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packages: [
        {
          guid: "b39b0daa-82af-4617-bf30-49bd915fa46f",
          destination: "Street Doverdale 201",
          awb: "28957193295",
          date: new Date(2022, 9, 29).toLocaleDateString(),
          recipient: "John Doe",
        },
        {
          guid: "f184efc5-7281-473e-baff-044600955b71",
          destination: "Street Doverdale 25",
          awb: "28957193295",
          date: new Date(2022, 9, 20).toLocaleDateString(),
          recipient: "Menelaus Rajko",
        },
        {
          guid: "6ce585e6-9a7b-41ba-aa7a-57988914e82f",
          destination: "Street Alonys 200",
          awb: "42345191223",
          date: new Date(2022, 9, 12).toLocaleDateString(),
          recipient: "Hanan Dorcas",
        },
        {
          guid: "60de2190-26d6-4ac4-a8ed-359e028dc3e8",
          destination: "Street Peson 201",
          awb: "32657151292",
          date: new Date(2022, 8, 20).toLocaleDateString(),
          recipient: "Medousa Domitius",
        },
        {
          guid: "3731ba01-57b5-4742-a64d-0de061b382be",
          destination: "Street Aelsop 201",
          awb: "12957101114",
          date: new Date(2022, 8, 18).toLocaleDateString(),
          recipient: "Jacob Troilos",
        },
      ],
    };
  }

  render() {
    return (
      <>
        <Stack direction="horizontal" gap={4}>
          <h2>Cars</h2>
          <h2>Drivers</h2>
          <h2>Packages</h2>
        </Stack>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Destination</th>
              <th>AWB</th>
              <th>Date</th>
              <th>Recipient</th>
            </tr>
          </thead>
          <tbody>
            {this.state.packages.map((p, i) => {
              return (
                <tr key={p.guid}>
                  <td>{i + 1}</td>
                  <td>{p.destination}</td>
                  <td>{p.awb}</td>
                  <td>{p.date}</td>
                  <td>{p.recipient}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default Packages;
