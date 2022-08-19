import { IncomingMessage } from "http";
import React from "react";

class Drivers extends React.Component {
  constructor(props) {
    super(props);
    console.log(`constructor`);

    this.state = {
      drivers: [
        {
          name: "Mihai Popescu",
          details: [
            { info: "0773546223" },
            { info: "mihai.popescu@asdmail.com" },
            { info: "zona Girocului" },
            { info: "TM01ASD" },
          ]
        },
        {
          name: "Jack Sparrow",
          details: [
            { info: "0774387543" },
            { info: "jack.sparrow@asdmail.com" },
            { info: "zona Aradului" },
            { info: "TM02ASD" },
          ]
        },
        {
          name: "Ion Ion",
          details: [
            { info: "0773555876" },
            { info: "ion.ion@asdmail.com" },
            { info: "zona Soarelui" },
            { info: "TM03ASD" },
          ]
        },
        {
          name: "Ilie Papadie",
          details: [
            { info: "0773434666" },
            { info: "ilie.papadie@asdmail.com" },
            { info: "zona Brancoveanu" },
            { info: "TM04ASD" },
          ]
        },
        {
          name: "Tomy Motan",
          details: [
            { info: "0773433985" },
            { info: "tomy.motan@asdmail.com" },
            { info: "Mosnita Noua" },
            { info: "TM05ASD" },
          ]
        },
        {
          name: "Gigi Negru",
          details: [
            { info: "0773322546" },
            { info: "gigi.negru@asdmail.com" },
            { info: "zona Sagului" },
            { info: "TM06ASD" },
          ]
        },
        {
          name: "Adrian Avram",
          details: [
            { info: "0773775634" },
            { info: "adrian.avram@asdmail.com" },
            { info: "zona UMT" },
            { info: "TM07ASD" },
          ]
        },
        {
          name: "Dan Georgescu",
          details: [
            { info: "0773999444" },
            { info: "mihai.popescu@asdmail.com" },
            { info: "Dumbravita" },
            { info: "TM08ASD" },
          ]
        },
        {
          name: "Octavian Marinescu",
          details: [
            { info: "0773664488" },
            { info: "octavian.marinescu@asdmail.com" },
            { info: "zona Centru" },
            { info: "TM09ASD" },
          ]
        },
        {
          name: "Grigore Savu",
          details: [
            { info: "0773338644" },
            { info: "grigore.savu@asdmail.com" },
            { info: "Ghiroda" },
            { info: "TM10ASD" },
          ]
        },
      ],
    }
  }

  render() {
    return (
      <div>
        <h1>Our drivers:</h1>
        {
          this.state.drivers.map((item) =>
            <div>
              <h3>{item.name}</h3>
              <ul>
                {item.details.map((sub) =>
                  <li>
                    {sub.info}
                  </li>
                )}
              </ul>
            </div>
          )
        }
      </div>
    )
  }
}
