import React, { Component } from 'react';

class Output extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
    }
  }

  componentDidUpdate(prevState, prevProps) {
    // this.props.
  }

  render() {
    return (
      <div>

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
//     width: 200px; <- this.state.width
//     height: 200px; <- this.state.height
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
