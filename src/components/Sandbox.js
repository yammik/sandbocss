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
  border: "solid 2px rgba(48,69,109,0.7)",
}

class Sandbox extends Component {
  state = {
    isDragging: false,
  }

  componentDidMount() {
    const w = document.getElementById('sandbox').offsetWidth;
    const h = document.getElementById('sandbox').offsetHeight;
    this.props.setSandboxDimensions(w, h);
  }

  setCurrentDiv = e => {
    e.stopPropagation();
    this.dragSet(false);
    this.props.setCurrent(e.target.id);
  }

  handleClick = e => {
    e.stopPropagation();
    debugger
    if (!this.state.isDragging) {
      this.props.unsetCurrent();
    }
    // this.state.isDragging ? null : this.props.unsetCurrent();
  }

  dragSet = tf => {
    this.setState(prevState => {
      return {
        isDragging: tf,
      }
    })
  }

  renderDiv = (div, z=0) => {
    const { updateDiv, currentElement, setCurrent } = this.props;
    return <Rnd
      key={div.key}
      className={div.className}
      id={div.key}
      style={div.key === currentElement ? styleEmph : style}
      size={{ width: div.width, height: div.height }}
      position={div.aligned ? {y: div.y} : { x: div.x, y: div.y }}
      onDrag={(e, d) => {
        e.stopPropagation();
        const newClassName = div.className.replace(/ center| left| right/, '');
        updateDiv(div.key, newClassName, div.width, div.height, d.x, d.y);
        this.dragSet(true);
      }}
      onDragStop={(e, d) => {
        e.stopPropagation();
        updateDiv(div.key, div.className, div.width, div.height, d.x, d.y);
        setCurrent(div.key);
      }}
      onResize={(e, d, ref, delta, pos) => {
        e.stopPropagation();
        updateDiv(div.key, div.className, ref.offsetWidth, ref.offsetHeight, pos.x, pos.y);
        setCurrent(div.key);
      }}
      onMouseDown={this.setCurrentDiv}
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
