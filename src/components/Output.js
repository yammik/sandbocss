import React, { Component } from 'react';

class Output extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { sandboxWidth, sandboxHeight } = this.props;
    return (
      <div id="output">
        <pre>
        {this.props.divs.map(div => {
          return <code key={div.key}>
            {'.'+div.className.split(' ').filter(word => word !== 'resizable').join(' ')+' {'}<br/>
            {'  position: absolute;'}<br/>
            {'  width: '+Math.round(div.width/sandboxWidth*100)+'%;'}<br/>
            {'  height: '+Math.round(div.height/sandboxHeight*100)+'%;'}<br/>
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
