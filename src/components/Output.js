import React, { Component } from 'react';

class Output extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="output">
        <pre>
        {this.props.divs.map(div => {
          return <code key={div.key}>
            {'.'+div.className+' {'}<br/>
            {'  position: absolute;'}<br/>
            {'  width: '+div.width+'px;'}<br/>
            {'  height: '+div.height+'px;'}<br/>
            {'  left: '+div.x+'px;'}<br/>
            {'  top: '+div.y+'px;'}<br/>
            {'}'}<br/><br/>
          </code>
        })}
      </pre>
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
