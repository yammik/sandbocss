import React, { Component } from 'react';
import ClassNameForm from "./ClassNameForm";
import { ChromePicker, MaterialPicker } from 'react-color';

class InteractiveCtrls extends Component {
  constructor() {
    super()
    this.state = {
      color: '',
      windowWidth: 1400,
    }
  }

  handleChangeComplete = (color, e) => {
    this.setState({
      color: color.rgb,
    });

    this.props.setColor(Object.values(color.rgb));
  };

  componentDidMount() {
    window.addEventListener('resize', e => {
      this.setState({
        windowWidth: window.innerWidth,
      })
    })
  }

  render() {
    const {
      align,
      move,
      resize,
      setColor
    } = this.props;

    return (
      <div id="controls">
        <ClassNameForm
          addDiv={this.props.addDiv}
          removeDiv={this.props.removeDiv}
         />
        <button onClick={() => align('left')}>
          L
        </button>
        <button onClick={() => align('center')}>
          C
        </button>
        <button onClick={() => align('right')}>
          R
        </button>
        <div id="directionPad">
          <button onClick={() => move('up')}>
            <span role="img" aria-label="up">🔼</span>
          </button>
          <br></br>
          <button onClick={() => move('left')}>
            <span role="img" aria-label="left">◀️</span>
          </button>
          <button onClick={() => move('down')}>
            <span role="img" aria-label="down">🔽</span>
          </button>
          <button onClick={() => move('right')}>
            <span role="img" aria-label="right">▶️</span>
          </button>
        </div>

        <div id="sizeCtrl">
          <button onClick={() => resize('xUp')}>
            <span role="img" aria-label="xlarg">🐘</span>X
          </button>
          <button onClick={() => resize('yUp')}>
            <span role="img" aria-label="ylarg">🐘</span>Y
          </button>
          <br></br>
          <button onClick={() => resize('xDown')}>
            <span role="img" aria-label="xsmol">🐁</span>X
          </button>
          <button onClick={() => resize('yDown')}>
            <span role="img" aria-label="ysmol">🐁</span>Y
          </button>
        </div>

        <div className='colorPicker'>{this.state.windowWidth > 1300 ? <ChromePicker color={this.state.color} alpha={this.state.alpha} onChangeComplete={this.handleChangeComplete} /> : <MaterialPicker color={this.state.color} alpha={this.state.alpha} onChangeComplete={this.handleChangeComplete} />}</div>
      </div>
    )
  }
}

export default InteractiveCtrls;
