import React, { Component } from 'react';
import Controls from "./Controls";
import Sandbox from "./Sandbox";
import Output from "./Output";
import { v4 } from 'uuid';


// sandbox must keep track of divs and their attributes in state
// sandbox has button to create div with unique id which will be used to search for and update the corresponding object in state.divs
// sandbox gets information for each div from Canvas : as div state in Canvas is updated, state.divs is updated in Sandbox
// sandbox must know the currently selected div in order to link to Controls
// sandbox has state to store information about currently selected div
// sandbox will pass in prop functions to Controls
class Container extends Component {
  constructor() {
    super();
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

  updateDiv = (divKey, className, width, height, x, y, aligned=false) => {
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
    }

    // if (this.state.currentElement === selectedDiv.key) {
      this.setState({
        divs: this.state.divs.map(div => div.key !== selectedDiv.key ? Object.assign({}, div, { children: div.children.map(dv => dv.key !== selectedDiv.key ? dv : newDiv) }) : newDiv),
      })
    // }
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
          }
        })
      })
    } else {
      this.setState({
        divs: this.state.divs.concat(newDiv),
      })
    }
  }


  // align div
  align = (direction) => {
    const div = this.findCurrent();
    if (div) {
      this.updateDiv(div.key, div.className, div.width, div.height, 0, 0);
      const newClass = div.className.replace(/ center| left| right/,'') + ' ' + direction;
      this.updateDiv(div.key, newClass, div.width, div.height, div.x, div.y, true);
    }
  }

  // directional movements
  move = (direction) => {
    const div = this.findCurrent();
    let newX = div.x, newY = div.y;
    if (div) {
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
    }
    this.updateDiv(div.key, div.className, div.width, div.height, newX, newY);
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

  render() {
    const { divs, currentElement } = this.state;
    return (
      <div id="container">
        <Controls
          updateDiv={this.updateDiv}
          addDiv={this.addDiv}
          align={this.align}
          move={this.move}
          resize={this.resize} />
        <Sandbox
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
