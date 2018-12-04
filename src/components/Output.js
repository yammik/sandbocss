import React, { Component } from 'react';


// {div.className.includes('center') ? this.centered() : div.className.includes('left') ? this.lefted() : div.className.includes('right') ? this.righted() : this.defaultProp(div) }

class Output extends Component {
  formatClassName = (className) => {
    return className.replace(/ center| left| right/,'');
  }

  lefted = () => {
    return (
      '  position: absolute;\n  left: 0;\n  right: auto;'
    )
  }

  righted = () => {
    return (
      '  position: absolute;\n  left: auto;\n  right: 0;'
    )
  }

  centered = () => {
    return (
      '  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;'
    )
  }

  defaultProp = div => {
    return (
      `  left: ${div.x}px;\n  top: ${div.y}px;\n  }`
    )
  }

  renderCode = div => {
    const { sandboxWidth, sandboxHeight } = this.props;
      return <code key={div.key}>
        {'.'+this.formatClassName(div.className)+' {'}<br/>
        {'  width: '+Math.round(div.width/sandboxWidth*100)+'%;'}<br/>
        {'  height: '+Math.round(div.height/sandboxHeight*100)+'%;'}<br/>
        {this.defaultProp(div)}
        <br/>
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
