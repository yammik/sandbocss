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
    };
  }

  render() {
    const { divs, updateDiv } = this.props;
    return (
      <div id="sandbox">
        {divs.map(div =>
          <Rnd
            key={div.key}
            className={div.className}
            style={style}
            size={{ width: div.width, height: div.height }}
            position={{ x: div.x, y: div.y }}
            onDragStop={(e, d) => {
              updateDiv(div.key, div.className, div.width, div.height, d.x, d.y);
            }}
            onResize={(e, direction, ref, delta, position) => {
              // debugger
              updateDiv(div.key, div.className, ref.offsetWidth, ref.offsetHeight, position.x, position.y);
            }}
            >
              <div>
                class: {div.className.split(' ').filter(word => word !== 'resizable').join(' ')}
              </div>
              <br></br>
              <div>
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
