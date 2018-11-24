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
      current: null,
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

  updateDiv = (key, className='resizable', width=0, height=0, x=0, y=0) => {
    this.setState({
      divs: this.state.divs.map(div => {
        if (div.key !== key) {
          return div;
        }
        return {
          key: key,
          className: className,
          width: width,
          height: height,
          x: x,
          y: y,
        }
      })
    })
  }

  addDiv = (name) => {
    this.setState({
      divs: this.state.divs.concat({
          key: v4(),
          className: `resizable ${name}`,
          width: 100,
          height: 100,
          x: 0,
          y: 0,
        }),
    })
  }

  render() {
    const { divs } = this.state;
    return (
      <div id="container">
        <Controls
          updateDiv={this.updateDiv}
          addDiv={this.addDiv} />
        <Sandbox
          updateDiv={this.updateDiv}
          divs={divs} />
        <Output divs={divs} />
      </div>
    )
  }

}

export default Container;
