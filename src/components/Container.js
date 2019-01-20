import React, { Component } from 'react';
import { v4 } from 'uuid';

import InteractiveCtrls from "./InteractiveCtrls";
import Sandbox from "./Sandbox";
import Output from "./Output";
import Controls from "./Controls";

// the top level of app

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divs: [],
      currentElement: null,
      sandboxWidth: 0,
      sandboxHeight: 0,
      resizing: false,
    };

  }

  setSandboxDimensions = (width, height) => {
    this.setState({
      sandboxWidth: width,
      sandboxHeight: height,
    })
  }

// ~~~~~~~~~~~ BEGIN select div ~~~~~~~~~~~

  setCurrent = divKey => {
    this.setState({
      currentElement: divKey,
    }, () => {
      document.addEventListener('keydown', this.handleKeydown);
      document.addEventListener('keyup', this.handleKeyup);
    })
  }

  unsetCurrent = () => {
    this.setState({
      currentElement: null,
    }, () => {
      document.removeEventListener('keydown', this.handleKeydown);
    })
  }

// ~~~~~~~~~~~ BEGIN select div ~~~~~~~~~~~



// ~~~~~~~~~~~ begin MOVE & RESIZE ON KEYDOWN ~~~~~~~~~~~

  handleKeydown = (e) => {
    if (e.keyCode === 16) {
      this.setState({
        resizing: true,
      }, () => {
        if (this.props.mode === 'interactive') {
          document.addEventListener('keydown', this.keyDownResize);
        }
      })
    }
    if (!this.state.resizing) {
      this.keyDownMove(e);
    }
  }
  keyDownResize = (e) => {
    switch (e.keyCode) {
      case 38:
        this.resize('yDown');
        break;
      case 40:
        this.resize('yUp');
        break;
      case 37:
        this.resize('xDown');
        break;
      case 39:
        this.resize('xUp');
        break;
      default:
        break;
    }
  }

  keyDownMove = (e) => {
    switch (e.keyCode) {
      case 38:
        this.move('up');
        break;
      case 40:
        this.move('down');
        break;
      case 37:
        this.move('left');
        break;
      case 39:
        this.move('right');
        break;
      default:
        break;
    }
  }

  handleKeyup = (e) => {
    if (e.keyCode === 16) {
      document.removeEventListener('keydown', this.keyDownResize);
      this.setState({
        resizing: false,
      }, () => {
        document.addEventListener('keydown', this.keyDownMove);
      })
    }
  }

// ~~~~~~~~~~~ end MOVE & RESIZE ON KEYDOWN ~~~~~~~~~~~



// ~~~~~~~~~~~ BEGIN grab div ~~~~~~~~~~~

  findDiv = key => {
    let matches = [];
    this.state.divs.forEach(div => {
      matches = matches.concat(div.children.filter(dv => dv.key === key));
    })
    return this.state.divs.find(dv => dv.key === key) || matches[0];
  }

  findCurrent = () => {
    return this.findDiv(this.state.currentElement);
  }

// ~~~~~~~~~~~ END grab div ~~~~~~~~~~~



// ~~~~~~~~~~~ BEGIN modify div data ~~~~~~~~~~

  addDiv = (name) => {
    const classNames = this.allClassNames();
    const styles = this.getUniqueStyles(this.flattenDivsArray(this.state.divs));

    const newDiv = {
      key: v4(),
      className: `${name}`,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      children: [],
      aligned: false,
      style: {},
    }
    const formattedClassName = this.formatClassName(newDiv.className);
    if (classNames.includes(formattedClassName)) {
      newDiv.style = styles.find(x => Object.keys(x)[0] === formattedClassName)[formattedClassName];
    }
    // debugger
    if (this.state.currentElement) {
      this.setState({
        divs: this.state.divs.map(div => {
          if (div.key !== this.state.currentElement) {
            return div;
          }
          return {
            key: this.state.currentElement,
            className: div.className,
            width: div.width,
            height: div.height,
            x: div.x,
            y: div.y,
            children: div.children.concat(newDiv),
            aligned: div.aligned,
            style: div.style,
          }
        }),
      }, () => {
        this.setCurrent(newDiv.key)
      })
    } else {
      this.setState({
        divs: this.state.divs.concat(newDiv),
      }, () => {
        this.setCurrent(newDiv.key)
      })
    }
  }

  updatePositionDOM = (divKey) => {
    // because div.x, div.y are independently managed from the physical position of the div, need to update a second time upon changing position via CSS by grabbing physical location on the DOM
    this.setState(prevState => {
        const newX = document.getElementById(divKey).getBoundingClientRect().left-document.getElementById('sandbox').getBoundingClientRect().left;
        const newY = document.getElementById(divKey).getBoundingClientRect().top-document.getElementById('sandbox').getBoundingClientRect().top;

        const selectedDiv = this.findDiv(divKey);
        const newDiv = {
          key: selectedDiv.key,
          className: selectedDiv.className,
          width: selectedDiv.width,
          height: selectedDiv.height,
          x: newX,
          y: newY,
          children: selectedDiv.children,
          aligned: selectedDiv.aligned,
          style: selectedDiv.style,
        }
        return {
          divs: this.state.divs.map(div => div.key !== selectedDiv.key ? Object.assign({}, div, { children: div.children.map(dv => dv.key !== selectedDiv.key ? dv : newDiv) }) : newDiv),
        }
      })
  }

  updateDiv = (divKey, className, width, height, x, y, aligned=false, cb=null) => {
    const selectedDiv = this.findDiv(divKey);
    const newDiv = {
      key: selectedDiv.key,
      className: className,
      width: width,
      height: height,
      x: x,
      y: y,
      children: selectedDiv.children,
      aligned: aligned,
      style: selectedDiv.style,
    }

    this.setState(prevState => {
      return {
        divs: this.state.divs.map(div => div.key !== selectedDiv.key ? Object.assign({}, div, { children: div.children.map(dv => dv.key !== selectedDiv.key ? dv : newDiv) }) : newDiv),
      }
    }, () => {
      if (cb) {
        cb(divKey);
      }
    })
  }

  flattenDivsArray = (divs) => {
    // flattens the divs and children. won't need if divs data are normalized
    return divs.reduce((memo, div) => {
      return memo.concat(div.children).concat(div);
    },[]);
  }

  formatClassName = (name) => {
    return name.replace('resizable ','');
  }

  getUniqueStyles = (divs) => {
    // reduce array based on className; if there are divs with the same className but different styles, only the first one is counted
    // divs should be flattened!!!!!!!
    const styles = divs.map(div => {
      const formattedClassName = this.formatClassName(div.className);
      return { [formattedClassName]: div.style }
    }) // only consider the className the user submitted

    const classList = styles.map(style => Object.keys(style)[0]).filter((v, i, arr) => arr.indexOf(v) === i);
    const stylesUnique = classList.map(clss => (
      styles.find(style => Object.keys(style)[0] === clss)
    ))

    return stylesUnique;
  }

  allClassNames = () => {
    // grab all classNames from flattened divs
    const divs = this.flattenDivsArray(this.state.divs);
    const uniqueStyles = this.getUniqueStyles(divs);
    return uniqueStyles.map(style => Object.keys(style)[0]);
  }

  align = (direction) => {
    const div = this.findCurrent();

    if (div) {
      const newClass = div.className.replace(/ center| left| right/,'') + ' ' + direction;
      this.updateDiv(div.key, newClass, div.width, div.height, div.x, div.y, true, this.updatePositionDOM);
    }
  }

  move = (direction) => {
    const div = this.findCurrent();
    if (div) {
      const newClass = div.className.replace(/ center| left| right/,'');

      let newX = div.x, newY = div.y;
      switch (direction) {
        case 'right':
          newX = div.x+10;
          break;
        case 'left':
          newX = div.x-10;
          break;
        case 'up':
          newY = div.y-10;
          break;
        case 'down':
          newY = div.y+10;
          break;
        default:
          break;
      }
      this.updateDiv(div.key, newClass, div.width, div.height, newX, newY);
    }
  }

  resize = (param) => {
    const div = this.findCurrent();
    if (div) {
      let newW = div.width, newH = div.height;

      switch (param) {
        case 'xUp':
          newW = div.width + 20;
          break;
        case 'xDown':
          newW = div.width - 20;
          break;
        case 'yUp':
          newH = div.height + 20;
          break;
        case 'yDown':
          newH = div.height - 20;
          break;
        default:
          break;
      }

      this.updateDiv(div.key, div.className, newW, newH, div.x, div.y, div.aligned);
    }
  }

  addStyle = (style) => {
    if (this.state.currentElement) {
      if (Object.keys(style)[0] === 'width') {
        style = {
          width: `${style.width}`
        }
      }
      const selectedDiv = this.findDiv(this.state.currentElement);
      const newDiv = {
        key: selectedDiv.key,
        className: selectedDiv.className,
        width: selectedDiv.width,
        height: selectedDiv.height,
        x: selectedDiv.x,
        y: selectedDiv.y,
        children: selectedDiv.children,
        aligned: selectedDiv.aligned,
        style: Object.assign({}, selectedDiv.style, style),
      }
      this.setState(prevState => {
        return {
          divs: this.state.divs.map(div => div.key !== selectedDiv.key ? Object.assign({}, div, { children: div.children.map(dv => dv.key !== selectedDiv.key ? dv : newDiv) }) : newDiv),
        }
      }, () => {
        console.log(`changed div ${this.state.currentElement} with ${Object.keys(style)}, ${style[Object.keys(style)]}`);
      })
    }
  }

  removeDiv = () => {
    this.setState(prevState => {
      return {
        currentElement: null,
        divs: prevState.divs
          .filter(div => div.key !== prevState.currentElement)
          .map(div => {
            return {...div,
              children: div.children.filter(dv => dv.key !== prevState.currentElement),
            }
          })
      }
    })
  }

  // ~~~~~~~~~~~ END modify div data ~~~~~~~~~~




  render() {
    const { divs, currentElement } = this.state;
    const { mode } = this.props;
    return (
      <div id="main">
        {
          mode === 'interactive' ?
          <InteractiveCtrls
            addDiv={this.addDiv}
            removeDiv={this.removeDiv}
            align={this.align}
            move={this.move}
            addStyle={this.addStyle}
            resize={this.resize} />
             :
          <Controls
            addDiv={this.addDiv}
            removeDiv={this.removeDiv}
            addStyle={this.addStyle} />
        }
        <Sandbox
          mode={mode}
          updateDiv={this.updateDiv}
          currentElement={currentElement}
          setCurrent={this.setCurrent}
          unsetCurrent={this.unsetCurrent}
          setSandboxDimensions={this.setSandboxDimensions}
          divs={divs} />
        <Output
          mode={mode}
          divs={divs}
          flattenDivsArray={this.flattenDivsArray}
          getUniqueStyles={this.getUniqueStyles}
          sandboxWidth={this.state.sandboxWidth}
          sandboxHeight={this.state.sandboxHeight} />
      </div>
    )
  }

}

export default Container;
// in classic mode,
