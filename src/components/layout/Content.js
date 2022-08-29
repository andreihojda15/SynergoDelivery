import React from "react";
import PropTypes from "prop-types";
import "./ContentStyle.css";
class Content extends React.Component {
  render() {
    return <div className="cnt">{this.props.children}</div>;
  }
}

Content.propTypes = {
  children: PropTypes.element,
};

export default Content;
