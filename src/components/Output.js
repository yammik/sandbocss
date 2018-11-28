import React, { Component } from 'react';

class Output extends Component {
  constructor(props) {
    super(props)
  }

  renderCode = div => {
    const { sandboxWidth, sandboxHeight } = this.props;
    if (div.className.includes('center')) {
      return <code key={div.key}>
        {'.'+div.className.split(' ').filter(word => word !== 'resizable' && word !== 'center').join(' ')+' {'}<br/>
        {'  width: '+Math.round(div.width/sandboxWidth*100)+'%;'}<br/>
        {'  height: '+Math.round(div.height/sandboxHeight*100)+'%;'}<br/>
        {'  left: 0;'}<br/>
        {'  right: 0;'}<br/>
        {'  margin-left: auto;'}<br/>
        {'  margin-right: auto;'}<br/>
        {'}'}<br/><br/>

        {div.children.map(dv => this.renderCode(dv))}
      </code>
    }

    return <code key={div.key}>
      {'.'+div.className.split(' ').filter(word => word !== 'resizable').join(' ')+' {'}<br/>
      {'  width: '+Math.round(div.width/sandboxWidth*100)+'%;'}<br/>
      {'  height: '+Math.round(div.height/sandboxHeight*100)+'%;'}<br/>
      {'  left: '+div.x+'px;'}<br/>
      {'  top: '+div.y+'px;'}<br/>
      {'}'}<br/><br/>

      {div.children.map(dv => this.renderCode(dv))}
    </code>
  }

  render() {
    return (
      <div id="output">
        <pre>
        {this.props.divs.map(div => {
          return this.renderCode(div);
        })}
      </pre>
      </div>
    )
  }
}

export default Output;
