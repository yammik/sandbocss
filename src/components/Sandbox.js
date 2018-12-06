import React, { Component } from 'react';
import { Rnd } from "react-rnd";
import styled from 'styled-components';


const style = {
  alignItems: "center",
  justifyContent: "center",
  outline: "solid 1px #ddd",
  background: "rgba(100,100,100,0.6)"
};

const styleEmph = {
  alignItems: "center",
  justifyContent: "center",
  outline: "solid 2px rgba(48,69,109,0.7)",
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

  divMaker = (style) => {
    const Div = styled.div`
      ${style}
    `;
    return Div;
  }

  setCurrentDiv = e => {
    e.stopPropagation();
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
    console.log(this.state.isDragging);
    console.log(this.props.currentElement);
    if (!this.state.isDragging && this.props.currentElement) {
      console.log('unsetting current div');
      this.props.unsetCurrent();
    } else {
      this.props.setCurrent(e.target.id);
    }
  }

  dragSet = tf => {
    this.setState(prevState => {
      return {
        isDragging: tf,
      }
    })
  }


  renderInteractiveDiv = (div, z=0) => {
    let divStyle;
    if (div.style['background-color']) {
      divStyle = Object.assign({}, style, {
        ['background-color']: div.style['background-color']
      })
    }
    if (this.props.currentElement === div.key) {
      divStyle = Object.assign({}, divStyle, {outline: 'solid 2px red'})
    }
    const { updateDiv, currentElement, setCurrent } = this.props;

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

  convertToCamel = (styleObj) => {
    var camelStyle = {};
    for (const key in styleObj) {
    const camelKey = key.replace(/-[a-z]/, l => l.toUpperCase()).replace('-','');
    camelStyle[camelKey] = styleObj[key]
    }
    return camelStyle;
  }

  renderDiv = (div, z=0) => {

    const camelStyle = this.convertToCamel(div.style)

    const emph = Object.assign({}, camelStyle, styleEmph);
    const { currentElement, setCurrent } = this.props;
    return <Rnd
      key={div.key}
      className={div.className}
      id={div.key}
      style={div.key === currentElement ? emph : camelStyle}
      onMouseDown={this.setCurrentDiv}
      bounds='parent'
      onClick={this.handleClick}
      onResize={(e, d, ref, delta, pos) => {
        e.stopPropagation();
        setCurrent(div.key);
      }}
      onDrag={(e, d) => {
        e.stopPropagation();
        this.dragSet(true);
      }}
    >
        {div.className.replace(/resizable| center| left| right/, '')}
      {div.children.map(div =>
        this.renderDiv(div, camelStyle, z+1)
      )}
    </Rnd>
  }

  renderStyledDiv = (div) => {
    const outlines = Object.keys(div.style).filter(cssProperty => cssProperty.includes('outline'));
    const divOutline = outlines.map(outlineProp => {
      return { [outlineProp]: div.style[outlineProp] }
    })
    let outline = divOutline || `outline: solid 1px black`;
    if (this.props.currentElement === div.key) {
      outline = `outline: solid 2px red`
    }
    const Div = styled.div`
      ${div.style};
      ${outline};
    `;

    return <Div
      key={div.key}
      className={div.className.replace(/resizable| center| left| right/, '')}
      id={div.key}
      onMouseDown={this.setCurrentDiv}
      bounds='parent'
      onClick={this.handleClick}
      >
        {div.className.replace(/resizable| center| left| right/, '')}
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
