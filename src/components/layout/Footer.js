import React from "react";
import packageJson from "../../../package.json";
import "./FooterStyle.css";
class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <p>Version : {packageJson.version}</p>
        <p>@2022 Copyright SynergoDelivery</p>
      </div>
    );
  }
}

export default Footer;
