import React, { Component } from 'react';
import InteractiveCtrls from "./InteractiveCtrls";
import Sandbox from "./Sandbox";
import Output from "./Output";
import { v4 } from 'uuid';
import Controls from "./Controls"

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

  setCurrent = divKey => {
    this.setState({
      currentElement: divKey,
    }, () => {
      document.addEventListener('keydown', this.handleKeydown);
      document.addEventListener('keyup', this.handleKeyup);
    })
  }

  keyDownResize = (e) => {
    switch (e.keyCode) {
      case 38:
        console.log('yUp');
        this.resize('yUp');
        break;
      case 40:
        console.log('yDown');
        this.resize('yDown');
        break;
      case 37:
        console.log('xDown');
        this.resize('xDown');
        break;
      case 39:
        console.log('xUp');
        this.resize('xUp');
        break;
      default:
        break;
    }
  }

  keyDownMove = (e) => {
    console.log('moveeeee', e.keyCode);
    switch (e.keyCode) {
      case 38:
        console.log('UP');
        this.move('up');
        break;
      case 40:
        console.log('DOWN');
        this.move('down');
        break;
      case 37:
        console.log('LEFT');
        this.move('left');
        break;
      case 39:
        console.log('RIGHT');
        this.move('right');
        break;
      default:
        break;
    }
  }

  handleKeydown = (e) => {
    if (e.keyCode === 16) {
      this.setState({
        resizing: true,
      }, () => {
        document.addEventListener('keydown', this.keyDownResize);
      })
    }
    if (!this.state.resizing) {
      this.keyDownMove(e);
    }
  }

  handleKeyup = (e) => {
    console.log('keyup');
    if (e.keyCode === 16) {
      document.removeEventListener('keydown', this.keyDownResize);
      this.setState({
        resizing: false,
      }, () => {
        document.addEventListener('keydown', this.keyDownMove);
      })
    }
  }

  unsetCurrent = () => {
    this.setState({
      currentElement: null,
    }, () => {
      document.removeEventListener('keydown', this.handleKeydown);
    })
  }

  findCurrent = () => {
    return this.findDiv(this.state.currentElement);
  }

  findDiv = key => {
    let matches = [];
    this.state.divs.forEach(div => {
      matches = matches.concat(div.children.filter(dv => dv.key === key));
    })
    return this.state.divs.find(dv => dv.key === key) || matches[0];
  }

// because div.x, div.y are independently managed from the physical position of the div, need to update a second time upon changing position via CSS by grabbing physical location on the DOM
  updatePositionDOM = (divKey) => {
    this.setState(prevState => {
        const newX = document.getElementById(divKey).getBoundingClientRect().left-document.getElementById('sandbox').getBoundingClientRect().left;
        const newY = document.getElementById(divKey).getBoundingClientRect().top-document.getElementById('sandbox').getBoundingClientRect().top;
        console.log('\n');

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

// flattens the divs and children. won't need if divs data are normalized
  flattenDivsArray = (divs) => {
    return divs.reduce((memo, div) => {
      return memo.concat(div.children).concat(div);
    },[]);
  }

// reduce array based on className; if there are divs with the same className but different styles, only the first one is counted
  getUniqueStyles = (divs) => {
    const styles = divs.map(div => (
      { [div.className.replace('resizable ','')]: div.style }
    )) // only consider the className the user submitted

    const classList = styles.map(style => Object.keys(style)[0]).filter((v, i, arr) => arr.indexOf(v) === i);
    const stylesUnique = classList.map(clss => (
      styles.find(style => Object.keys(style)[0] === clss)
    ))

    return stylesUnique;
  }

// grab all classNames from flattened divs
  allClassNames = () => {
    const divs = this.flattenDivsArray(this.state.divs);
    const uniqueStyles = this.getUniqueStyles(divs);
    //
  }

  addDiv = (name) => {
    this.allClassNames();

    const newDiv = {
      key: v4(),
      className: `resizable ${name}`,
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      children: [],
      aligned: false,
      style: {},
    }
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

  // align div
  align = (direction) => {
    const div = this.findCurrent();

    if (div) {
      const newClass = div.className.replace(/ center| left| right/,'') + ' ' + direction;
      this.updateDiv(div.key, newClass, div.width, div.height, div.x, div.y, true, this.updatePositionDOM);
    }
  }

  // directional movements
  move = (direction) => {
    console.log('moveeeeee')
    const div = this.findCurrent();
    if (div) {
      const newClass = div.className.replace(/ center| left| right/,'');

      let newX = div.x, newY = div.y;
      switch (direction) {
        case 'right':
          newX = div.x+50;
          break;
        case 'left':
          newX = div.x-50;
          break;
        case 'up':
          newY = div.y-50;
          break;
        case 'down':
          newY = div.y+50;
          break;
        default:
          break;
      }
      this.updateDiv(div.key, newClass, div.width, div.height, newX, newY);
    }
  }

  // size change controls
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

  setColor = (rgba) => {
    const style = {
      ['background-color']: `rgba(${rgba})`
    }
    this.addStyle(style);
  }

  render() {
    const { divs, currentElement } = this.state;
    const { mode } = this.props;
    return (
      <div id="main">
        {
          mode === 'interactive' ?
          <InteractiveCtrls
            updateDiv={this.updateDiv}
            addDiv={this.addDiv}
            removeDiv={this.removeDiv}
            align={this.align}
            move={this.move}
            setColor={this.setColor}
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
