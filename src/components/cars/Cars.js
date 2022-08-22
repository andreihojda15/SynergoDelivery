
import React from "react";
import Table from 'react-bootstrap/Table';

/**
 * Car model:
 *  guid
 *  registrationNumber
 *  status // available, not available
 *  packageIds // array of package guids
 *  driverId // driver guid
 */

class Cars extends React.Component {
  constructor() {
    super();
    this.state = {
      cars: [
        {
          guid: "d1c51f3b-f13f-407f-b6e2-46c5bbc747ad",
          brand: "Audi",
          model: "A4",
          fuel: "diesel",
          power: 150,
        },
        {
          guid: "62ee4afa-b261-4f0a-9581-386cf9e0c4c0",
          brand: "BMW",
          model: "X1",
          fuel: "hydrogen",
          power: 143,
        },
        {
          guid: "c1f0c515-4862-434c-91bb-b477504f5161",
          brand: "Mercedes-Benz",
          model: "CLA200",
          fuel: "compressed natural gas",
          power: 136,
        },
        {
          guid: "0e063045-c96a-4d34-8cc5-4ca2223616dc",
          brand: "Volkswagen",
          model: "Scirocco",
          fuel: "ethanol",
          power: 140,
        },
        {
          guid: "49ce9298-161a-4a04-82c0-31640f05dc31",
          brand: "Pagani",
          model: "Huayra",
          fuel: "petrol",
          power: 537,
        },
        {
          guid: "be37bda1-0b19-43da-b874-ac359926737c",
          brand: "Cadillac",
          model: "XT4",
          fuel: "gasoline",
          power: 128,
        },
        {
          guid: "80575920-8b09-42be-90ae-e7000e9c0384",
          brand: "Tesla",
          model: "S 70",
          fuel: "electric",
          power: 245,
        },
        {
          guid: "bad6d196-a0f1-47bb-8e95-69ace085bcee",
          brand: "Toyota",
          model: "Supra",
          fuel: "biodiesel",
          power: 280,
        },
      ],
    };
  }

  render() {  
    return(        
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Brand</th>
          <th>Model</th>
          <th>Fuel</th>
          <th>Power</th>
        </tr>
      </thead>
      <tbody>
        {
          this.state.cars.map((car,i) =>
          
            <tr key={car.guid}>
              <td>{i+1}</td>
             <td>{car.brand}</td>
             <td>{car.model}</td>
             <td>{car.fuel}</td>
             <td>{car.power}</td>
            </tr>
            )
        }
      </tbody>
    </Table>      
     ) ;
  }
}

export default Cars;
