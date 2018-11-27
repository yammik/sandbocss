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
      xi: 0,
      yi: 0,
      xf: 0,
      yf: 0,
    };

    this.addDiv = this.addDiv.bind(this)
  }

  updateInitialCoords = (x, y) => {
    this.setState({
      xi: x,
      yi: y,
    })
  }

  updateFinalCoords = (x, y) => {
    this.setState({
      xf: x,
      yf: y,
    })
  }

  setCurrent = divKey => {
    // debugger
    this.setState({
      currentElement: divKey,
    })
  }

  // TODO : child is nested. Need to find a way to update child

  updateDiv = (divKey, width, height, x, y) => {
    let matches = [];
    this.state.divs.forEach(div => {
      matches = matches.concat(div.children.filter(dv => dv.key === divKey));
    })
    const selectedDiv = this.state.divs.find(dv => dv.key === divKey) || matches[0];
    const newDiv = {
      key: selectedDiv.key,
      className: selectedDiv.className,
      width: width,
      height: height,
      x: x,
      y: y,
      children: selectedDiv.children,
    }
    if (this.state.currentElement === selectedDiv.key) {
      this.setState({
        divs: this.state.divs.map(div => {
          if (div.key !== selectedDiv.key) {
            return Object.assign({}, div, {
              children: div.children.map(dv => {
                if (dv.key !== selectedDiv.key) {
                  return dv;
                }
                return newDiv;
              })
            })
          }
          return newDiv;
        })
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

  alignCenter = () => {
    const div = document.getElementById(this.state.currentElement);
    debugger
    this.updateDiv(div.key, div.className, div.width, div.height)
  }

  alignLeft = () => {

  }

  alignRight = () => {

  }


  render() {
    const { divs, currentElement } = this.state;
    return (
      <div id="container">
        <Controls
          updateDiv={this.updateDiv}
          addDiv={this.addDiv}
          alignCenter={this.alignCenter}
          alignLeft={this.alignLeft}
          alignRight={this.alignRight} />
        <Sandbox
          updateDiv={this.updateDiv}
          currentElement={currentElement}
          setCurrent={this.setCurrent}
          divs={divs} />
        <Output divs={divs} />
      </div>
    )
  }

}

export default Container;
