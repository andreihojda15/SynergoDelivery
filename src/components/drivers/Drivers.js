import React from "react";
import { Table } from 'react-bootstrap'

/**
 * Driver model:
 *  guid
 *  name
 *  phoneNumber
 *  carId // car guid, can be undefined => status: busy / available
 */

class Drivers extends React.Component {
  constructor(props) {
    super(props);
    console.log(`constructor`);

    this.state = {
      drivers: [
        {
          name: "Mihai Popescu",
          mobile: "0773546223",
          email: "mihai.popescu@asdmail.com",
          area: "zona Girocului",
          car: "TM01ASD",
        },
        {
          name: "Jack Sparrow",
          mobile: "0774387543",
          email: "jack.sparrow@asdmail.com",
          area: "zona Aradului",
          car: "TM02ASD",
        },
        {
          name: "Ion Ion",
          mobile: "0773555876",
          email: "ion.ion@asdmail.com",
          area: "zona Soarelui",
          car: "TM03ASD",
        },
        {
          name: "Ilie Papadie",
          mobile: "0773434666",
          email: "ilie.papadie@asdmail.com",
          area: "zona Brancoveanu",
          car: "TM04ASD",
        },
        {
          name: "Tomy Motan",
          mobile: "0773433985",
          email: "tomy.motan@asdmail.com",
          area: "Mosnita Noua",
          car: "TM05ASD",
        },
        {
          name: "Gigi Negru",
          mobile: "0773322546",
          email: "gigi.negru@asdmail.com",
          area: "zona Sagului",
          car: "TM06ASD"
        },
        {
          name: "Adrian Avram",
          mobile: "0773775634",
          email: "adrian.avram@asdmail.com",
          area: "zona UMT",
          car: "TM07ASD"
        },
        {
          name: "Dan Georgescu",
          mobile: "0773999444",
          email: "mihai.popescu@asdmail.com",
          area: "Dumbravita",
          car: "TM08ASD",
        },
        {
          name: "Octavian Marinescu",
          mobile: "0773664488",
          email: "octavian.marinescu@asdmail.com",
          area: "zona Centru",
          car: "TM09ASD",
        },
        {
          name: "Grigore Savu",
          mobile: "0773338644",
          email: "grigore.savu@asdmail.com",
          area: "Ghiroda",
          car: "TM10ASD",
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
              <th>Mobile</th>
              <th>Email</th>
              <th>Area of delivery</th>
              <th>Car number</th>
            </tr>
            </thead>
            <tbody>
            { 
              this.state.drivers.map((item, i) => 
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{item.name}</td>
                  <td>{item.mobile}</td>
                  <td>{item.email}</td>
                  <td>{item.area}</td>
                  <td>{item.car}</td>
                </tr>
              )
            }
          </tbody>
        </Table>
    );
  }
}

export default Drivers;
