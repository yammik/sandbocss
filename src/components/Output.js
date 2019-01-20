import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';


class Output extends Component {
  state = {
    copied: false,
  }

  formatClassName = (className) => {
    return className.replace(/resizable | center| left| right/, '');
  }

  lefted = () => '  position: absolute;\n  left: 0;\n  right: auto;'

  righted = () => '  position: absolute;\n  left: auto;\n  right: 0;'

  centered = () => '  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;'

  defaultProp = div => `  left: ${Math.floor(div.x)}px;\n  top: ${Math.floor(div.y)}px;\n  `

  componentDidUpdate(prevProps, prevState) {
    if (this.props.divs.length && prevProps.divs !== this.props.divs) {
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
    const { sandboxWidth, sandboxHeight } = this.props;
    if (Object.keys(div.style).length) {
      return (
        <code key={div.key}>
          {'.'+this.formatClassName(div.className)+' {'}<br/>
          {'  width: '+Math.round(Math.floor(div.width/sandboxWidth*100))+'%;'}<br/>
          {'  height: '+Math.round(Math.floor(div.height/sandboxHeight*100))+'%;'}<br/>
          {this.defaultProp(div)}
          {this.formatCSS(div.style)}
          <br/>
          {'}'}<br/><br/>
          {div.children.map(dv => this.renderCode(dv))}
        </code>
      )
    }
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

  render() {
    const { flattenDivsArray, getUniqueStyles, divs } = this.props;
    const allDivs = flattenDivsArray(divs);
    const stylesUnique = getUniqueStyles(allDivs);

    const cssCode = this.props.mode === 'classic' ?
      stylesUnique.map(style => this.renderCodeWithCleanStyleObj(style))
      : this.props.divs.map(div => this.renderCode(div))

    // the code that would be copied to clipboard
    // should make a helper function just for formatting the str
    const cssCodeInStr = cssCode.length ? cssCode
      .map(code => code.props.children.filter(x => typeof x === 'string').join('').replace(/{/g, '{\n')).join('\n\n') : '';

    return (
      <div id="output">
        <div id="code">
          <pre>
            {cssCode}
          </pre>
        </div>
      <CopyToClipboard text={cssCodeInStr}
        onCopy={() => this.setState({copied: true})}>
        <span className="copyLink">{this.state.copied ? 'copied!' : 'copy CSS code'}</span>
      </CopyToClipboard>
      </div>

    )
  }
}


export default Output;
