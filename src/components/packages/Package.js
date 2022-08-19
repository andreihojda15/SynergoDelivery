import React, { Component } from "react";

export default class Package extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packages: [
        {
          destination: "Street Doverdale 201",
          awb: "28957193295",
          date: new Date(2022, 9, 29).toLocaleDateString(),
          recipient: "John Doe",
        },
        {
          destination: "Street Doverdale 25",
          awb: "28957193295",
          date: new Date(2022, 9, 20).toLocaleDateString(),
          recipient: "Menelaus Rajko",
        },
        {
          destination: "Street Alonys 200",
          awb: "42345191223",
          date: new Date(2022, 9, 12).toLocaleDateString(),
          recipient: "Hanan Dorcas",
        },
        {
          destination: "Street Peson 201",
          awb: "32657151292",
          date: new Date(2022, 8, 20).toLocaleDateString(),
          recipient: "Medousa Domitius",
        },
        {
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
      <div>
        {this.state.packages.map((p) => {
          return (
            <div>
              <p>Destination: {p.destination}</p>
              <p>AWB: {p.awb}</p>
              <p>Date: {p.date}</p>
              <p>Recipient: {p.recipient}</p>
            </div>
          );
        })}
      </div>
    );
  }
}
