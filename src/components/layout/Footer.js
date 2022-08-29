import React from "react";
import packageJson from "../../../package.json";
import "./FooterStyle.css";
class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <p>Version : {packageJson.version}</p>
        <p>©{new Date().getFullYear()} SynergoDelivery</p>
      </div>
    );
  }
}

export default Footer;
