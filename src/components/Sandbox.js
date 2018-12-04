import React, { Component } from 'react';
import { Rnd } from "react-rnd";
import styled from 'styled-components';


const style = {
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "rgba(100,100,100,0.6)"
};

const styleEmph = {
  alignItems: "center",
  justifyContent: "center",
  border: "solid 2px rgba(48,69,109,0.7)",
}

class Sandbox extends Component {
  state = {
    isDragging: false,
    xi: 0,
    yi: 0,
  }

  componentDidMount() {
    const w = document.getElementById('sandbox').offsetWidth;
    const h = document.getElementById('sandbox').offsetHeight;
    this.props.setSandboxDimensions(w, h);

    // MAKE THIS WORK
    document.getElementById('controls').style.height = `${h}px;`
  }


  setCurrentDiv = e => {
    e.stopPropagation();
    this.state.isDragging ? this.dragSet(false) : this.dragSet(true);
    this.props.setCurrent(e.target.id);
    this.setInitialCoords(e);
  }

  setInitialCoords = e => {
    this.setState({
      xi: e.clientX,
      yi: e.clientY,
    }, () => {
    })
  }

  handleClick = e => {
    e.stopPropagation();
    if (!this.state.isDragging && this.props.currentElement) {
      console.log('\nunsetting drag');
      this.props.unsetCurrent();
    }
  }

  dragSet = tf => {
    this.setState(prevState => {
      console.log('\nSETTING DRAG');
      return {
        isDragging: tf,
      }
    })
  }

  // componentDidUpdate?
  componentDidUpdate(prevProps, prevState) {
    // debugger
  }

  renderInteractiveDiv = (div, z=0) => {
    const { updateDiv, currentElement, setCurrent } = this.props;
    return <Rnd
      key={div.key}
      className={div.className}
      id={div.key}
      style={div.key === currentElement ? styleEmph : style}
      size={{ width: div.width, height: div.height }}
      position={{ x: div.x, y: div.y }}
      onDrag={(e, d) => {
        e.stopPropagation();
        const newClassName = div.className.replace(/ center| left| right/, '');
        // debugger
        const newX = e.target.getBoundingClientRect().left - document.getElementById('sandbox').getBoundingClientRect().left;
        const newY = e.target.getBoundingClientRect().top - document.getElementById('sandbox').getBoundingClientRect().top;
        console.log("onDrag updateDiv with: ", newX, newY);

        updateDiv(div.key, newClassName, div.width, div.height, div.x, div.y);
        this.dragSet(true);
      }}
      onDragStop={(e, d) => {
        e.stopPropagation();
        const xf = e.clientX;
        const yf = e.clientY;
        const xi = this.state.xi;
        const yi = this.state.yi;
        const dx = xf - xi;
        const dy = yf - yi;
        // debugger
        const newX = div.x + dx;
        const newY = div.y + dy;
        console.log("onDragStop updateDiv with: ", newX, newY);
        updateDiv(div.key, div.className, div.width, div.height, newX, newY);
        // updateDiv(div.key, div.className, div.width, div.height, div.x, div.y);
        setCurrent(div.key);
      }}
      onResize={(e, d, ref, delta, pos) => {
        e.stopPropagation();
        updateDiv(div.key, div.className, ref.offsetWidth, ref.offsetHeight, pos.x, pos.y);
        setCurrent(div.key);
      }}
      onMouseDown={this.setCurrentDiv}
      onClick={this.handleClick}
      dragGrid={[10,10]}
      bounds='parent'
      z-index={z}
    >
      <div>
        class: {div.className.split(' ').filter(word => !['resizable', 'center', 'left', 'right'].includes(word)).join(' ')}
      </div>
      {div.children.map(div =>
        this.renderInteractiveDiv(div, z+1)
      )}
    </Rnd>
  }

  renderDiv = (div, style, z=0) => {
    const { currentElement, setCurrent } = this.props;
    const Div = styled.div`
      ${style}
    `;
    return Div;
  }

  render() {
    const { mode, divs } = this.props;
    return (
      <div id="sandbox">
        { mode === 'classic' ? divs.map(div => this.renderDiv(div, style))
        : divs.map(div => this.renderInteractiveDiv(div))}
      </div>
    )
  }
}

export default Sandbox;
