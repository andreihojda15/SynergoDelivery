import React from "react";
 

class Cars extends React.Component{
    constructor(){
       super() 
       this.state = {
        cars: [
            {
                id: 1,
                brand: 'Audi',
                model: 'A4',
                fuel: 'diesel',
                power: 150
             },
             {
                id: 2,
                brand: 'BMW',
                model: 'X1',
                fuel: 'hydrogen',
                power: 143
             },
             {
                id: 3,
                brand: 'Mercedes-Benz',
                model: 'CLA200',
                fuel: 'compressed natural gas',
                power: 136
             },
             {
                id: 4,
                brand: 'Volkswagen',
                model: 'Scirocco',
                fuel: 'ethanol',
                power: 140
             },
             {
                id: 5,
                brand: 'Pagani',
                model: 'Huayra',
                fuel: 'petrol',
                power: 537
             },
            ]
       }
    }
    
    state = {
        divcontainer:false
    }

    render(){
        var HandleChange = () =>
        {
            this.setState({divcontainer:!this.state.divcontainer});
        }
        const x = this.state.divcontainer;
        const carList = this.state.cars.map(car => <h2>The {car.brand}  {car.model} automobile it runs on {car.fuel} and it has a power of {car.power} hp </h2>)
        return(
            <div>
                <h1>CAR LIST</h1>
                <button onClick={HandleChange}>{x?'Hide':'Show'}</button>
                {
                  x && <div>{carList}</div>
                }
            </div>
        )
    }
}


export default Cars 