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
 * 
 * Table columns
 *  #
 *  AWB
 *  Sender
 *  Sender Phone
 *  Departure Address
 *  Departure Date
 *  Recipient Name
 *  Recipient Phone
 *  Recipient Address
 *  Package Status
 *  Assigned to a Car - Yes / No
 */

class Packages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packages: [
        {
          guid: "b39b0daa-82af-4617-bf30-49bd915fa46f", 
          senderName:"Wilfred Warner",
          senderPhoneNumber:"+1 224-523-0893",
          departureAdress:"2631 Medical Center Drive", 
          departureDate: new Date(2022, 6, 29).toLocaleDateString(),
          awb: "28957193295",
          deliveryAdress: "Street Doverdale 201",
          deliveryDate: "set",  
          recipientName: "John Doe",
          recipientPhoneNumber: "+1 331-254-1866",
          carID: "set",  
          packageStatus: "undefined",
          assignedToCar: "no",
        },
        {
          guid: "f184efc5-7281-473e-baff-044600955b71",
          senderName:"Britney Walker",
          senderPhoneNumber:"+1 315-407-5174",
          departureAdress:"1588 Brentwood Drive",
          departureDate: new Date(2022, 7, 20).toLocaleDateString(), 
          awb: "93640145365",
          deliveryAdress: "2485 Worley Avenue",
          deliveryDate: "set",  
          recipientName: "Menelaus Rajko",
          recipientPhoneNumber: "+1 201-872-9969",
          carID: "undefined",  
          packageStatus: "undefined",
          assignedToCar: "no",
        },
        {
          guid: "6ce585e6-9a7b-41ba-aa7a-57988914e82f",
          senderName:"Shane Alvarado",
          senderPhoneNumber:"+1 582-282-7917",
          departureAdress:"4984 Timberbrook Lane",
          departureDate: new Date(2022, 7, 12).toLocaleDateString(), 
          awb: "42345191223",
          deliveryAdress: "Street Alonys 200",
          deliveryDate: "undefined",   
          recipientName: "Hanan Dorcas",
          recipientPhoneNumber: "+1 201-867-9401",
          carID: "set",  
          packageStatus: "undefined",
          assignedToCar: "no",
        },
        {
          guid: "60de2190-26d6-4ac4-a8ed-359e028dc3e8",
          senderName:"Robin Mccallum",
          senderPhoneNumber:"+1 531-776-3643",
          departureAdress:"4467 Frank Avenue",
          departureDate: new Date(2022, 8, 20).toLocaleDateString(),
          awb: "32657151292", 
          deliveryAdress: "Street Peson 201",
          deliveryDate: "undefined",   
          recipientName: "Medousa Domitius",
          recipientPhoneNumber: "+1 582-201-1351",
          carID: "undefined", 
          packageStatus: "undefined",
          assignedToCar: "no",
        },
        {
          guid: "3731ba01-57b5-4742-a64d-0de061b382be",
          senderName:"Eilidh Dupont",
          senderPhoneNumber:"+1 312-864-8013",
          departureAdress:"1293 Dogwood Lane",
          departureDate: new Date(2022, 8, 18).toLocaleDateString(),
          awb: "12957101114",
          deliveryAdress: "Street Aelsop 201",
          deliveryDate: "set",  
          recipientName: "Jacob Troilos",
          recipientPhoneNumber: "+1 505-950-4893",
          carID: "set", 
          packageStatus: "undefined",
          assignedToCar: "no",
        },
        {
          guid: "3731ba01-57b5-4742-a64d-0de061b382be",
          senderName:"Phillipa Skinner",
          senderPhoneNumber:"+1 223-343-0977",
          departureAdress:"2819 Blane Street",
          departureDate: new Date(2022, 5, 8).toLocaleDateString(),
          awb: "72834902536",
          deliveryAdress: "1709 Heavner Avenue",
          deliveryDate: "undefined",  
          recipientName: "Oisin Browning",
          recipientPhoneNumber: "+1 505-644-6540",
          carID: "set", 
          packageStatus: "undefined",
          assignedToCar: "no",
        },
        {
          guid: "3731ba01-57b5-4742-a64d-0de061b382be",
          senderName:"Alfred Lin",
          senderPhoneNumber:"+1 309-690-4682",
          departureAdress:"4089 Powder House Road",
          departureDate: new Date(2022, 8, 2).toLocaleDateString(),
          awb: "28634517893",
          deliveryAdress: "910 Sherman Street",
          deliveryDate: "undefined",  
          recipientName: "Atif Kelley",
          recipientPhoneNumber: "+1 582-222-4932",
          carID: "set", 
          packageStatus: "undefined",
          assignedToCar: "no",
        },
        {
          guid: "3731ba01-57b5-4742-a64d-0de061b382be",
          senderName:"Otto Lovell",
          senderPhoneNumber:"+1 214-849-2375",
          departureAdress:"506 Alexander Drive",
          departureDate: new Date(2022, 5, 30).toLocaleDateString(),
          awb: "46159826371",
          deliveryAdress: "3947 Stark Hollow Road",
          deliveryDate: "undefined",  
          recipientName: "Camille Needham",
          recipientPhoneNumber: "+1 203-284-1579",
          carID: "undefined", 
          packageStatus: "set",
          assignedToCar: "no",
        },
      ],
    };
  }

  render() {
    return (
     
      <>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>     
              <th>AWB</th>
              <th>Sender</th>
              <th>Sender Phone</th>
              <th>Departure Adress</th>
              <th>Departure Date</th>
              <th>Recipient Name</th>
              <th>Recipient Phone</th>
              <th>Recipient Adress</th>
              <th>Assigned to a car</th>
              <th>Package Status</th>   
            </tr>
          </thead>
          <tbody>
            {
            this.state.packages.map((p, i) => {
              
                if(p.deliveryDate && p.carID === "undefined")
                   p.packageStatus = "processing"
                if(p.deliveryDate === "undefined" && p.carID === "set")
                   {
                    p.packageStatus = "in delivery"
                    p.assignedToCar = "yes"
                   }
                if(p.deliveryDate === "set" && p.carID === "set")
                {
                  p.packageStatus = "delivered"
                  p.assignedToCar = "yes"
                 }
                            
              return (
                <tr key={p.guid}>
                  <td>{i + 1}</td>
                  <td>{p.awb}</td>
                  <td>{p.senderName}</td>
                  <td>{p.senderPhoneNumber}</td>
                  <td>{p.departureAdress}</td>
                  <td>{p.departureDate}</td>
                  <td>{p.recipientName}</td>
                  <td>{p.recipientPhoneNumber}</td>
                  <td>{p.deliveryAdress}</td>
                  <td>{p.assignedToCar}</td>
                  <td>{p.packageStatus}</td>            
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
