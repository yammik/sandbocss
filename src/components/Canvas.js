import React, { Component } from 'react';
import { Rnd } from "react-rnd";

const style = {
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
};

class Canvas extends Component {
  constructor(props) {
  super(props);
    this.state = {
      currentElement: '',
      width: 200,
      height: 200,
      x: 10,
      y: 10,
    };
  }
  render() {
    return (
      <div id="sandbox">
        <Rnd
          className="resizable"
          style={style}
          size={{ width: this.state.width, height: this.state.height }}
          position={{ x: this.state.x, y: this.state.y }}
          onDragStop={(e, d) => {
            this.setState({ x: d.x, y: d.y });
          }}
          onResize={(e, direction, ref, delta, position) => {
            this.setState({
              width: ref.style.width,
              height: ref.style.height,
              ...position
            });
          }}
          >
            <div>
              width: {this.state.width}, height: {this.state.height}
            </div>
            <br></br>
            <div>
              x: {Math.floor(this.state.x)}, y: {Math.floor(this.state.y)}
            </div>
          </Rnd>
      </div>
    )
  }
}

export default Canvas;

// make a div this.props.divs.forEach with div.className, div.width, div.height, div.x, div.y
