import React, { Component } from 'react';
import { Rnd } from "react-rnd";
import styled from 'styled-components';


const style = {
  alignItems: "center",
  justifyContent: "center",
  outline: "solid 1px #ddd",
  background: "rgba(100,100,100,0.6)"
};

class Sandbox extends Component {
  state = {
    isDragging: false,
  }

  componentDidMount() {
    const w = document.getElementById('sandbox').offsetWidth;
    const h = document.getElementById('sandbox').offsetHeight;
    // need this in case we need to calculate percentage of width or height of each div
    this.props.setSandboxDimensions(w, h);

  }

  divMaker = (style) => {
    // creates a new component with user-designated style.
    // Essentially a new component is rendered everytime a div's style is changed and appState is updated
    const Div = styled.div`
      ${style}
    `;
    return Div;
  }

  handleClick = e => {
    // stopPropagation to prevent parent div from getting selected when child is clicked
    e.stopPropagation();

    // need to know if div was being dragged or if it is a single click, ...
    // because drag between clicks still registers as click every. single. time. the. mouse. moves.
    // if being dragged, the app knows not to not count further mouse downs as a mouse down until this.state.isDragging is set to false
    if (!this.state.isDragging && this.props.currentElement) {
      this.props.unsetCurrent();
    } else {
      this.props.setCurrent(e.target.id);
    }
  }

  dragSet = tf => {
    // for distinguising dragging when in interactive mode
    this.setState({
      isDragging: tf,
    })
  }

  renderInteractiveDiv = (div, z=0) => {
    // render divs using this if in interactive mode
    let divStyle;
    if (div.style['background-color']) {
      // combines the preexisting div.style with background color style, instead of overwriting
      divStyle = Object.assign({}, style, {
        ['background-color']: div.style['background-color']
      })
    }
    // outline with red if div is currently selected
    if (this.props.currentElement === div.key) {
      divStyle = Object.assign({}, divStyle, {outline: 'solid 2px red'})
    }
    const { updateDiv, setCurrent } = this.props;

    return <Rnd
      key={div.key}
      className={div.className}
      id={div.key}
      style={divStyle}
      size={{ width: div.width, height: div.height }}
      position={{ x: div.x, y: div.y }}
      onDrag={(e, d) => {
        e.stopPropagation();
        const newClassName = div.className.replace(/resizable| center| left| right/, '');
        updateDiv(div.key, newClassName, div.width, div.height, div.x, div.y);
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
      dragGrid={[10,10]}
      bounds='parent'
      z-index={z}
    >
      {div.className.replace(/resizable| center| left| right/, '')}
      {div.children.map(div =>
        this.renderInteractiveDiv(div, z+1)
      )}
    </Rnd>
  }

  renderStyledDiv = (div) => {
    // render divs using this in classic mode
    const outlines = Object.keys(div.style).filter(cssProperty => cssProperty.includes('outline'));
    const divOutline = outlines.map(outlineProp => {
      return { [outlineProp]: div.style[outlineProp] }
    })
    let outline = divOutline || `outline: solid 1px black`;
    // outline with red if div is currently selected
    if (this.props.currentElement === div.key) {
      outline = `outline: solid 2px red`
    }
    const Div = styled.div`
      ${div.style};
      ${outline};
    `;

    return <Div
      key={div.key}
      className={div.className}
      id={div.key}
      onMouseDown={this.setCurrentDiv}
      bounds='parent'
      onClick={this.handleClick}
      >
        {div.className}
        {div.children.map(div =>
          this.renderStyledDiv(div)
        )}
      </Div>
  }

  render() {
    const { mode, divs } = this.props;
    return (
      <div id="sandbox">
        { mode === 'classic' ? divs.map(div => this.renderStyledDiv(div))
        : divs.map(div => this.renderInteractiveDiv(div))}
      </div>
    )
  }
}

export default Sandbox;
