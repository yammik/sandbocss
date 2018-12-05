import React, { Component } from 'react';
import ClassNameForm from "./ClassNameForm";
import Properties from "./Properties";
import htmlScreenCaptureJs from 'html-screen-capture-js';

class Controls extends Component {
  screenCapture = () => {
    debugger
    const x = htmlScreenCaptureJs.capture(
      htmlScreenCaptureJs.OutputType.STRING,
      window.document,
      {
        'imageFormatForDataUrl': 'image/jpeg',
        'imageQualityForDataUrl': 1.0
      }
    );
    debugger
  }

  render() {
    return (
      <div id="controls">
        <ClassNameForm addDiv={this.props.addDiv} />
        <button onClick={this.props.removeDiv}>remove selected div</button>
        <button onClick={this.screenCapture}>screen capture</button>
        <Properties addStyle={this.props.addStyle} />
      </div>
    )
  }
}

export default Controls;
