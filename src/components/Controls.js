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
      biggerX,
      smallerX,
      biggerY,
      smallerY,
      move
    } = this.props;

    return (
      <div id="controls">
        <form onSubmit={this.handleSubmit}>
          class name:
          <div>
            <input onChange={this.handleChange}></input>
            <input type="submit"/>

          </div>
        </form>
        <br></br>
        <button onClick={() => align('center')}>
          find my center
        </button>
        <br></br>
        <button onClick={() => align('left')}>
          to da left
        </button>
        <br></br>
        <button onClick={() => align('right')}>
          give me rights
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
          <button onClick={biggerX}>
            <span role="img" aria-label="xlarg">🐘</span> X
          </button>
          <button onClick={biggerY}>
            <span role="img" aria-label="ylarg">🐘</span>Y
          </button>
          <br></br>
          <button onClick={smallerX}>
            <span role="img" aria-label="xsmol">🐁</span>X
          </button>
          <button onClick={smallerY}>
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
