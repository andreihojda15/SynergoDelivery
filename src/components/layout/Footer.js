import React from "react";
import packageJson from '../../../package.json';

class Footer extends React.Component {
    render(){
        return (
            <div>
               <p>Version : {packageJson.version}</p>
               <p>copyright 2022 SynergoDelivery</p>
            </div>
        );
    }
}

export default Footer;