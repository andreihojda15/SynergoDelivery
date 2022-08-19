import React from "react";

class Content extends React.Component {
  render() {
    return (<>
      <p>Some content made by {this.props.name}</p>
      {this.props.children}
    </>);
  }
}

export default Content;
