import React, { Component } from 'react';
import ClassNameForm from "./ClassNameForm";
import Properties from "./Properties";
import * as htmlScreenCaptureJs from 'html-screen-capture-js';

class Controls extends Component {

  screenCapture = () => {
    // !!!! COMING SOON !!!! in v2
    // allow screen capture to go with the generated CSS code
    // so x below works, but not sure what to do with it yet
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
        <ClassNameForm
          addDiv={this.props.addDiv}
          removeDiv={this.props.removeDiv}
         />
        <Properties addStyle={this.props.addStyle} />
      </div>
    )
  }
}

export default Controls;
