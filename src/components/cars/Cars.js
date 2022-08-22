
import React from "react";
import Table from 'react-bootstrap/Table';
//import {Drivers} from '../drivers/Drivers.js';
/**
 * Car model:
 *  guid
 *  registrationNumber
 *  status // available, not available
 *  packageIds // array of package guids
 *  driverId // driver guid
 * 
 *  Table columns
 *  #
 *  Registration number
 *  Status
 *  Number of Packages
 *  Assigned to a Driver - Yes / No
 */
const pkid = [1,2,3];
class Cars extends React.Component {
  
  /*
  constructor() {
    super();
    this.state = {
      cars: [
        {
          guid: "d1c51f3b-f13f-407f-b6e2-46c5bbc747ad",
          registrationNumber: "TM02XYZ",
          
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
  */

  constructor()
  {
    super();
    this.state = {cars: [new car("d1c51f3b-f13f-407f-b6e2-46c5bbc747ad","TM02XYZ","Not Available",pkid.length,1),
    new car("62ee4afa-b261-4f0a-9581-386cf9e0c4c0","TM99PWR","Available","0",undefined),
    new car("c1f0c515-4862-434c-91bb-b477504f5161","TM78KUL","Not Available",5,3),
    new car("0e063045-c96a-4d34-8cc5-4ca2223616dc","TM54LLO","Not Available",12,4),
    new car("49ce9298-161a-4a04-82c0-31640f05dc31","TM12BIV","Available","0",undefined),
    new car("be37bda1-0b19-43da-b874-ac359926737c","TM65JON","Available","0",undefined),
    new car("80575920-8b09-42be-90ae-e7000e9c0384","TM33HEY","Not Available",20,12),
    new car("bad6d196-a0f1-47bb-8e95-69ace085bcee","TM05ZZZ","Available","0",undefined)]
  }
  }
//>>>>>>>> ???? >>>>>> car.packagesIds ? this.packagesIds : "None"
  render() {  
    return(        
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Registration number</th>
          <th>Status</th>
          <th>Number of Packages</th>
          <th>Assigned to a Driver</th>
        </tr>
      </thead>
      <tbody>
        {
          this.state.cars.map((car,i) =>
          
            <tr key={car.car_guid}>
              <td>{i+1}</td>
             <td>{car.registrationNumber}</td>
             <td>{car.status}</td>
             <td>{car.packageIds}</td> 
             <td>{car.driverId ? "Yes" : "No"}</td>
            </tr>
            )
        }
      </tbody>
    </Table>      
     ) ;
  }
}

export class car {
  constructor(car_guid,registrationNumber,status,packageIds,driverId)
  {
    this.car_guid = car_guid;
    this.registrationNumber = registrationNumber;
    this.status = status;
    this.packageIds = packageIds;
    this.driverId = driverId;
  }
}

export default Cars;
