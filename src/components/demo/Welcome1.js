import React from "react";

class Welcome1 extends React.Component {
  constructor(props) {
    super(props);
    this.props.onLoad();
    console.log(`constructor`);

    this.state = {
      wasClicked: false,
      otherProperty: 'string',
    };
  }

  componentDidMount() {
    console.log(`did mount`);
  }

  componentWillUnmount() {
    console.log(`will unmount`);
  }

  handleClick() {
    this.setState({
      wasClicked: true,
    }, () => {
      console.log(`(2) handle click: was clicked - ${this.state.wasClicked}`);
      console.log(`(2) handle click: other property - ${this.state.otherProperty}`);
    });
    console.log(`(1) handle click: was clicked - ${this.state.wasClicked}`);

    this.setState({
      otherProperty: 'other string',
    }, () => {
      console.log(`(3) handle click: was clicked - ${this.state.wasClicked}`);
      console.log(`(3) handle click: other property - ${this.state.otherProperty}`);
    });
    console.log(`(1) handle click: other property - ${this.state.otherProperty}`);
  }

  render() {
    console.log(`render`);
    return (
      <div onClick={() => {
        this.handleClick();
      }}>
        <h1>Hello, {this.props.name} ({this.props.age})</h1>
        <p>Was clicked: {this.state.wasClicked ? 'yes' : 'no'}</p>
        {this.props.children}
      </div>
    );
  }
}

export default Welcome1;
