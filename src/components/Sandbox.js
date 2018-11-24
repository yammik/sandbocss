import React, { Component } from 'react';
import { Rnd } from "react-rnd";

const style = {
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
};

class Sandbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentElement: '',
      width: 200,
      height: 200,
      x: 0,
      y: 0,
    };
  }

  // for each div in this.prop.divs, render a <Rnd /> with the appropriate size and position
  // when saving attributes of the div, save numbers as numbers; makes it easier for math. Append 'px' when outputting code
  render() {
    const { divs, updateDiv } = this.props;
    return (
      <div id="sandbox">
        {divs.map(div =>
          <Rnd
            key={div.key}
            className="resizable"
            style={style}
            size={{ width: div.width, height: div.height }}
            position={{ x: div.x, y: div.y }}
            onDragStop={(e, d) => {
              updateDiv(div.key, 'resizable', div.width, div.height, d.x, d.y);
            }}
            onResize={(e, direction, ref, delta, position) => {
              updateDiv(div.key, 'resizable', ref.style.width, ref.style.height, position.x, position.y);
            }}
            ><div>
              width: {div.width}, height: {div.height}
            </div>
            <br></br>
            <div>
              x: {Math.floor(div.x)}, y: {Math.floor(div.y)}
            </div>
          </Rnd>
        )}
      </div>
    )
  }
}

export default Sandbox;

// make a div this.props.divs.forEach with div.className, div.width, div.height, div.x, div.y
