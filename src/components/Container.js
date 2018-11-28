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
    if (this.state.currentElement === divKey) {
      this.setState({
        currentElement: null,
      })
    } else {
      this.setState({
        currentElement: divKey,
      })
    }
  }

  // remove?
  unsetCurrent = () => {
    this.setState({
      currentElement: null,
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

  updateDiv = (divKey, className, width, height, x, y) => {
    const selectedDiv = this.findDiv(divKey);
    const newDiv = {
      key: selectedDiv.key,
      className: className,
      width: width,
      height: height,
      x: x,
      y: y,
      children: selectedDiv.children,
    }

    if (this.state.currentElement === selectedDiv.key) {
      this.setState({
        divs: this.state.divs.map(div => div.key !== selectedDiv.key ? Object.assign({}, div, { children: div.children.map(dv => dv.key !== selectedDiv.key ? dv : newDiv) }) : newDiv)
      })
    }
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
    const domDiv = document.getElementById(this.state.currentElement);
    const div = this.findCurrent();
    // const newX = domDiv.parentElement.offsetWidth/2 - div.width/2;
    const newClass = div.className.split(' ').filter(cls => !['center', 'left', 'right'].includes(cls)).join(' ') + ' ' + direction;
    // const newClass = div.className.includes(direction) ? div.className : `${div.className} ${direction}`;
    this.updateDiv(div.key, newClass, div.width, div.height, div.x, div.y);
  }

  // directional movements
  move = (direction) => {
    const div = this.findCurrent();
    switch (direction) {
      case 'right':
        this.updateDiv(div.key, div.className, div.width, div.height, div.x+50, div.y);
        break;
      case 'left':
        this.updateDiv(div.key, div.className, div.width, div.height, div.x-50, div.y);
        break;
      case 'up':
        this.updateDiv(div.key, div.className, div.width, div.height, div.x, div.y-50);
        break;
      case 'down':
        this.updateDiv(div.key, div.className, div.width, div.height, div.x, div.y+50);
        break;
    }
  }

  // size change controls
  biggerX = () => {
    const div = this.findCurrent();
    this.updateDiv(div.key, div.className, div.width+20, div.height, div.x, div.y);
  }
  biggerY = () => {
    const div = this.findCurrent();
    this.updateDiv(div.key, div.className, div.width, div.height+20, div.x, div.y);
  }
  smallerX = () => {
    const div = this.findCurrent();
    this.updateDiv(div.key, div.className, div.width-20, div.height, div.x, div.y);
  }
  smallerY = () => {
    const div = this.findCurrent();
    this.updateDiv(div.key, div.className, div.width, div.height-20, div.x, div.y);
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
          biggerX={this.biggerX}
          biggerY={this.biggerY}
          smallerX={this.smallerX}
          smallerY={this.smallerY} />
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
