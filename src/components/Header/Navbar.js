import React from "react";
import './NavbarStyle.css';

let Navbar = () => {
    
    return(
        <nav>
            <div className="logo">
                <h1>Synergo Delivery</h1>
            </div>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#vehicletracking">Vehicle Tracking</a></li>
                <li><a href="#pricing&packages">Pricing & Packages</a></li>
            </ul>
        </nav>
    )
}

export default Navbar;