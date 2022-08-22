import React from "react";
import "./ContentStyle.css";
class Content extends React.Component {
  render() {
    return (<div className="cnt">
      {this.props.children}
    </div>);
  }
}

export default Content;
