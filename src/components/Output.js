import React, { Component } from 'react';

class Output extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
    }
  }

  componentDidUpdate(prevState, prevProps) {
    // iterate through this.props.divs to generate code
    // each div will have the following structure:
    // div1 = { key: '', className: '', width: n, height: m, x: a, y: b } x being left, y being top
    let output = '';
    this.props.divs.forEach(div => {
      output += `.${div.className} {\n  position: absolute;\n  width: ${div.width}px;\n  height: ${div.height}px;\n  top: ${div.y}px;\n  left: ${div.x}px;\n}`
    })
    console.log(output);
    this.setState({
      code: output,
    })
  }

  render() {
    return (
      <div>
        <p>

        </p>
      </div>
    )
  }
}

export default Output;

// stringify the following:
// .test {
//     position: absolute;
//     user-select: auto;
//     touch-action: none;
//     width: 200px; <- this.props.width
//     height: 200px; <- this.props.height
//     display: inline-block;
//     top: 0px;
//     left: 0px;
//     cursor: move;
//     border: 1px solid rgb(221, 221, 221);
//     transform: translate(10px, 28.75px);
//     max-width: 9.0072e+15px;
//     max-height: 9.0072e+15px;
//     box-sizing: border-box;
// }
