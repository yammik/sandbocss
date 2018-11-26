import React, { Component } from 'react';
import { Rnd } from "react-rnd";

const style = {
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
};

const styleEmph = {
  alignItems: "center",
  justifyContent: "center",
  border: "solid 2px red",
}

class Sandbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentElement: '',
    };
  }

  setCurrent = div => {
    this.setState({
      currentElement: div.key,
    })
  }

  render() {
    const { divs, updateDiv } = this.props;
    const { currentElement } = this.state;
    return (
      <div id="sandbox">
        {divs.map(div =>
          <Rnd
            key={div.key}
            className={div.className}
            style={div.key === currentElement ? styleEmph : style}
            size={{ width: div.width, height: div.height }}
            position={{ x: div.x, y: div.y }}
            onDragStop={(e, d) => {
              updateDiv(div.key, div.className, div.width, div.height, d.x, d.y);
            }}
            onResize={(e, direction, ref, delta, position) => {
              updateDiv(div.key, div.className, ref.offsetWidth, ref.offsetHeight, position.x, position.y);
            }}
            onClick={() => this.setCurrent(div)}
            >
              <div>
                class: {div.className.split(' ').filter(word => word !== 'resizable').join(' ')}
              </div>
              <br></br>
              <div>
                w: {div.width} px, h: {div.height} px
              </div>
              <br></br>
              <div>
                x: {Math.floor(div.x)} px, y: {Math.floor(div.y)} px
              </div>
          </Rnd>
        )}
      </div>
    )
  }
}

export default Sandbox;

// make a div this.props.divs.forEach with div.className, div.width, div.height, div.x, div.y
