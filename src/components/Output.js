import React, { Component } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

// {div.className.includes('center') ? this.centered() : div.className.includes('left') ? this.lefted() : div.className.includes('right') ? this.righted() : this.defaultProp(div) }

class Output extends Component {
  state = {
    copied: false,
  }

  formatClassName = (className) => {
    return className.replace(/resizable | center| left| right/, '');
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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.divs.length && prevProps.divs !== this.props.divs) {
      console.log('setting copied state to false');
      this.setState({
        copied: false,
      })
    }
  }

  formatCSS = styleObj => {
    const style = this.props.mode === 'interactive' && JSON.stringify(styleObj).includes('color') ?
      JSON.stringify(styleObj).replace(/"|{|}/g, '').replace(/:/, ': ') :
      JSON.stringify(styleObj).replace(/"|{|}/g, '').replace(/:/g, ': ').split(',').map(str => `  ${str};`).join('\n')
    return style;
  }

  renderCodeWithCleanStyleObj = (styleObj) => {
    const key = Object.keys(styleObj)[0];
    return (
      <code key={key}>
        {`.${key} {`}<br/>
        {this.formatCSS(styleObj[key])}
        <br/>
        {`}`}<br/><br/>
      </code>
    )
  }

  renderCode = div => {
    if (Object.keys(div.style).length) {
      return (
        <code key={div.key}>
          {'.'+this.formatClassName(div.className)+' {'}<br/>
          {this.formatCSS(div.style)}
          <br/>
          {'}'}<br/><br/>
          {div.children.map(dv => this.renderCode(dv))}
        </code>
      )
    }
    const { sandboxWidth, sandboxHeight } = this.props;
    return (
      <code key={div.key}>
        {'.'+this.formatClassName(div.className)+' {'}<br/>
        {'  width: '+Math.round(div.width/sandboxWidth*100)+'%;'}<br/>
        {'  height: '+Math.round(div.height/sandboxHeight*100)+'%;'}<br/>
        {this.defaultProp(div)}
        <br/>
        {'}'}<br/><br/>
        {div.children.map(dv => this.renderCode(dv))}
      </code>
    )
  }

  getUniqueStyles = (divs) => {
    const styles = divs.map(div => (
      { [div.className.replace('resizable ','')]: div.style }
    ))
    const classList = styles.map(style => Object.keys(style)[0]).filter((v, i, arr) => arr.indexOf(v) === i);
    const stylesUnique = classList.map(clss => (
      styles.find(style => Object.keys(style)[0] === clss)
    ))
    return stylesUnique;
  }

  render() {
    const allDivs = this.props.divs.reduce((memo, div) => {
      return memo.concat(div.children).concat(div);
    },[]);
    const stylesUnique = this.getUniqueStyles(allDivs);

    const cssCode = this.props.mode === 'classic' ?
      stylesUnique.map(style => this.renderCodeWithCleanStyleObj(style))
      : this.props.divs.map(div => {
        return this.renderCode(div);
      })

    const cssCodeInStr = cssCode.length ? cssCode.map(code => code.props.children.filter(x => typeof x === 'string').join('')).join('\n') : '';

    return (
      <div id="output">
        <pre>
          {cssCode}
      </pre>
      <CopyToClipboard text={cssCodeInStr}
        onCopy={() => this.setState({copied: true})}>
        <span>{this.state.copied ? 'copied!' : 'copy CSS code'}</span>
      </CopyToClipboard>
      </div>

    )
  }
}


export default Output;
