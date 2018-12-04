import React, { Component } from 'react';
import InteractiveCtrls from "./InteractiveCtrls";
import Sandbox from "./Sandbox";
import Output from "./Output";
import { v4 } from 'uuid';
import Controls from "./Controls"

// in classic mode, style is set by Controls via Properties component
// ^sets the style of currentElement
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divs: [],
      currentElement: null,
      sandboxWidth: 0,
      sandboxHeight: 0,
    };

    this.addDiv = this.addDiv.bind(this)
  }

  setSandboxDimensions = (width, height) => {
    this.setState({
      sandboxWidth: width,
      sandboxHeight: height,
    })
  }

  setCurrent = divKey => {
    this.setState({
      currentElement: divKey,
    })
  }

  unsetCurrent = () => {
    this.setState({
      currentElement: null
    })
  }

  findCurrent = () => {
    return this.findDiv(this.state.currentElement);
  }

  findDiv = key => {
    let matches = [];
    this.state.divs.forEach(div => {
      matches = matches.concat(div.children.filter(dv => dv.key === key));
    })
    return this.state.divs.find(dv => dv.key === key) || matches[0];
  }

  updatePositionDOM = (divKey) => {
    this.setState(prevState => {
        // this is supposed to set the X and Y of the newly positioned div:
        // after CSS sets the div to desired position, get coordinates and update div properties in the state
        // works when aligning with buttons
        // somehow brings coords back to pre-alignment when dragging or using button to move (x, y)
        const newX = document.getElementById(divKey).getBoundingClientRect().left-document.getElementById('sandbox').getBoundingClientRect().left;
        const newY = document.getElementById(divKey).getBoundingClientRect().top-document.getElementById('sandbox').getBoundingClientRect().top;
        // debugger
        console.log('updateDiv second time with coordinates: ', newX, newY);
        console.log('\n');

        const selectedDiv = this.findDiv(divKey);
        const newDiv = {
          key: selectedDiv.key,
          className: selectedDiv.className,
          width: selectedDiv.width,
          height: selectedDiv.height,
          // x: selectedDiv.x,
          x: newX,
          // x: 100,
          // y: selectedDiv.y,
          y: newY,
          // y: 100,
          children: selectedDiv.children,
          aligned: selectedDiv.aligned,
          style: selectedDiv.style,
        }
        return {
          divs: this.state.divs.map(div => div.key !== selectedDiv.key ? Object.assign({}, div, { children: div.children.map(dv => dv.key !== selectedDiv.key ? dv : newDiv) }) : newDiv),
        }
      })
  }

  updateDiv = (divKey, className, width, height, x, y, aligned=false, cb=null) => {
    const selectedDiv = this.findDiv(divKey);
    const newDiv = {
      key: selectedDiv.key,
      className: className,
      width: width,
      height: height,
      x: x,
      y: y,
      children: selectedDiv.children,
      aligned: aligned,
      style: selectedDiv.style,
    }

    this.setState(prevState => {
      return {
        divs: this.state.divs.map(div => div.key !== selectedDiv.key ? Object.assign({}, div, { children: div.children.map(dv => dv.key !== selectedDiv.key ? dv : newDiv) }) : newDiv),
      }
    }, () => {
      if (cb) {
        cb(divKey);
      }
    })
  }

  addDiv = (name) => {
    const newDiv = {
      key: v4(),
      className: `resizable ${name}`,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      children: [],
      aligned: false,
    }
    if (this.state.currentElement) {
      this.setState({
        divs: this.state.divs.map(div => {
          if (div.key !== this.state.currentElement) {
            return div;
          }
          return {
            key: this.state.currentElement,
            className: div.className,
            width: div.width,
            height: div.height,
            x: div.x,
            y: div.y,
            children: div.children.concat(newDiv),
            aligned: div.aligned,
            style: div.style,
          }
        }),
      })
    } else {
      this.setState({
        divs: this.state.divs.concat(newDiv),
        currentElement: newDiv.key,
      })
    }
  }

  // align div
  align = (direction) => {
    const div = this.findCurrent();

    if (div) {
      const newClass = div.className.replace(/ center| left| right/,'') + ' ' + direction;
      this.updateDiv(div.key, newClass, div.width, div.height, div.x, div.y, true, this.updatePositionDOM);
    }
  }

  // directional movements
  move = (direction) => {
    const div = this.findCurrent();
    if (div) {
      const newClass = div.className.replace(/ center| left| right/,'');
      console.log('moved');
      console.log(newClass);

      let newX = div.x, newY = div.y;
      switch (direction) {
        case 'right':
          newX = div.x+50;
          break;
        case 'left':
          newX = div.x-50;
          break;
        case 'up':
          newY = div.y-50;
          break;
        case 'down':
          newY = div.y+50;
          break;
        default:
          break;
      }
      this.updateDiv(div.key, newClass, div.width, div.height, newX, newY);
    }
  }

  // size change controls
  resize = (param) => {
    const div = this.findCurrent();
    if (div) {
      let newW = div.width, newH = div.height;

      switch (param) {
        case 'xUp':
          newW = div.width + 20;
          break;
        case 'xDown':
          newW = div.width - 20;
          break;
        case 'yUp':
          newH = div.height + 20;
          break;
        case 'yDown':
          newH = div.height - 20;
          break;
        default:
          break;
      }

      this.updateDiv(div.key, div.className, newW, newH, div.x, div.y, div.aligned);
    }
  }

  addStyle = (style) => {
    if (this.state.currentElement) {
      if (Object.keys(style)[0] === 'width') {
        style = {
          width: `${style.width} !important`
        }
      }
      const selectedDiv = this.findDiv(this.state.currentElement);
      const newDiv = {
        key: selectedDiv.key,
        className: selectedDiv.className,
        width: selectedDiv.width,
        height: selectedDiv.height,
        x: selectedDiv.x,
        y: selectedDiv.y,
        children: selectedDiv.children,
        aligned: selectedDiv.aligned,
        style: Object.assign({}, selectedDiv.style, style),
      }
      console.log(newDiv.style);

      this.setState(prevState => {
        return {
          divs: this.state.divs.map(div => div.key !== selectedDiv.key ? Object.assign({}, div, { children: div.children.map(dv => dv.key !== selectedDiv.key ? dv : newDiv) }) : newDiv),
        }
      }, () => {
        console.log(`changed div ${this.state.currentElement} with ${Object.keys(style)}, ${style[Object.keys(style)]}`);
      })

    }

  }

  render() {
    const { divs, currentElement } = this.state;
    const { mode } = this.props;
    return (
      <div id="container">
        {
          mode === 'interactive' ?
          <InteractiveCtrls
            updateDiv={this.updateDiv}
            addDiv={this.addDiv}
            align={this.align}
            move={this.move}
            resize={this.resize} />
             :
          <Controls
            addDiv={this.addDiv}
            addStyle={this.addStyle} />
        }
        <Sandbox
          mode={mode}
          updateDiv={this.updateDiv}
          currentElement={currentElement}
          setCurrent={this.setCurrent}
          unsetCurrent={this.unsetCurrent}
          setSandboxDimensions={this.setSandboxDimensions}
          divs={divs} />
        <Output
          divs={divs}
          sandboxWidth={this.state.sandboxWidth}
          sandboxHeight={this.state.sandboxHeight} />
      </div>
    )
  }

}

export default Container;
// in classic mode,
