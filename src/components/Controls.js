import React, { Component } from 'react';
import ClassNameForm from "./ClassNameForm";
import Properties from "./Properties";

class Controls extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="controls">
        <ClassNameForm addDiv={this.props.addDiv} />
        <Properties addStyle={this.props.addStyle} />
      </div>
    )
  }
}

export default Controls;
