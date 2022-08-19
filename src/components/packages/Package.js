import React, { Component } from "react";

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
      <div>
        {this.state.packages.map((p) => {
          return (
            <div key={p.guid}>
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

export default Packages;
