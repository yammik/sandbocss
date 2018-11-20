import React, { Component } from 'react';
import Controls from "./Controls"
import Output from "./Output"
import Canvas from "./Canvas"

// sandbox must keep track of divs and their attributes in state
// sandbox has button to create div with unique id which will be used to search for and update the corresponding object in state.divs
// sandbox gets information for each div from Canvas : as div state in Canvas is updated, state.divs is updated in Sandbox
// sandbox must know the currently selected div in order to link to Controls
// sandbox has state to store information about currently selected div
// sandbox will pass in prop functions to Controls
class Sandbox extends Component {
  constructor() {
    super();
    this.state = {
      divs: [],
      current: null,
      xi: 0,
      yi: 0,
      xf: 0,
      yf: 0,
    }
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

  updateDiv = (key, className='', width=0, height=0, x=0, y=0) => {
    this.setState({
      divs: [...this.state.divs.filter(div => div.key !== key), {
        key: key,
        className: className,
        width: width,
        height: height,
        x: x,
        y: y,
      }],
    })
  }

  render() {
    const { divs } = this.state;
    return (
      <div>
        <Controls updateDiv={this.updateDiv} />
        <Canvas divs={divs} />
        <Output divs={divs} />
      </div>
    )
  }

}

export default Sandbox;
