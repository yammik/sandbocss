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
  }

  componentDidMount() {
    const w = document.getElementById('sandbox').offsetWidth;
    const h = document.getElementById('sandbox').offsetHeight;
    this.props.setSandboxDimensions(w, h);
  }

  handleClick = e => {
    e.stopPropagation();
    this.props.setCurrent(e.target.id);
  }
  renderDiv = (div, z=0) => {
    const { updateDiv, setCurrent, currentElement } = this.props;
    return <Rnd
      key={div.key}
      className={div.className}
      id={div.key}
      style={div.key === currentElement ? styleEmph : style}
      size={{ width: div.width, height: div.height }}
      position={{ x: div.x, y: div.y }}
      onDragStop={(e, d) => {
        e.stopPropagation();
        updateDiv(div.key, div.className, div.width, div.height, d.x, d.y);
        // setCurrent(div.key);
      }}
      onResize={(e, d, ref, delta, pos) => {
        e.stopPropagation();
        updateDiv(div.key, div.className, ref.offsetWidth, ref.offsetHeight, pos.x, pos.y);
        // setCurrent(div.key);
      }}
      onClick={this.handleClick}
      dragGrid={[30,30]}
      bounds='parent'
      z-index={z}
    >
      <div>
        class: {div.className.split(' ').filter(word => !['resizable', 'center', 'left', 'right'].includes(word)).join(' ')}
      </div>
      {div.children.map(div =>
        this.renderDiv(div, z+1)
      )}
    </Rnd>
  }

  render() {
    const { divs } = this.props;
    return (
      <div id="sandbox">
        {divs.map(div =>
          this.renderDiv(div)
        )}
      </div>
    )
  }
}

export default Sandbox;
