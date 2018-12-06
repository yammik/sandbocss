import React, { Component } from 'react';
import ClassNameForm from "./ClassNameForm";
import Properties from "./Properties";
import * as htmlScreenCaptureJs from 'html-screen-capture-js';

class Controls extends Component {
  screenCapture = () => {
    const x = htmlScreenCaptureJs.capture(
      htmlScreenCaptureJs.OutputType.OBJECT,
      window.document,
      {
        'imageFormatForDataUrl': 'image/jpeg',
        'imageQualityForDataUrl': 1.0
      }
    );
  }

  render() {
    return (
      <div id="controls">
        <ClassNameForm addDiv={this.props.addDiv} />
        <button class="delbtn" onClick={this.props.removeDiv}>🚮 div</button>
        <Properties addStyle={this.props.addStyle} />
      </div>
    )
  }
}

export default Controls;
