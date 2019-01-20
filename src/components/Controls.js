import React, { Component } from 'react';
import * as htmlScreenCaptureJs from 'html-screen-capture-js';
import ClassNameForm from "./ClassNameForm";
import Properties from "./Properties";

class Controls extends Component {

  screenCapture = () => {
    // !!!! COMING SOON !!!! in v2
    // allow screen capture to go with the generated CSS code
    // so x below works, but not sure what to do with it yet
    const screenCapture = htmlScreenCaptureJs.capture(
      htmlScreenCaptureJs.OutputType.OBJECT,
      window.document,
      {
        'imageFormatForDataUrl': 'image/jpeg',
        'imageQualityForDataUrl': 1.0
      }
    );
    return screenCapture
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
