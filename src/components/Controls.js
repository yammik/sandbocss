import React, { Component } from 'react';

class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      className: 'test',
    }
  }

  handleChange = (e) => {
    this.setState({
      className: e.target.value,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addDiv(this.state.className);
    this.setState({
      className: 'test',
    })
    e.target.reset();
  }

  render() {
    const {
      align,
      move,
      resize,
    } = this.props;

    return (
      <div id="controls">
        <form onSubmit={this.handleSubmit} className="classNameForm">
          class name:
          <div>
            <input onChange={this.handleChange} className="classNameInput"></input>
            <br></br>
            <input className="classNameSubmit" type="submit" value="make a div"></input>

          </div>
        </form>
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

        <div id="palette">

        </div>
      </div>
    )
  }
}

export default Controls;
