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
      alignCenter,
      alignLeft,
      alignRight,
      moveRight,
      moveLeft,
      moveUp,
      moveDown,
      biggerX,
      smallerX,
      biggerY,
      smallerY
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
        <button onClick={alignCenter}>
          find my center
        </button>
        <br></br>
        <button onClick={alignLeft}>
          to da left
        </button>
        <br></br>
        <button onClick={alignRight}>
          give me rights
        </button>
        <div id="directionPad">
          <button onClick={moveUp}>🔼</button><br></br>
          <button onClick={moveLeft}>◀️</button>
          <button onClick={moveDown}>🔽</button>
          <button onClick={moveRight}>▶️</button>
        </div>

        <div id="sizeCtrl">
          <button onClick={biggerX}>🐘X</button>
          <button onClick={biggerY}>🐘Y</button><br></br>
          <button onClick={smallerX}>🐁X</button>
          <button onClick={smallerY}>🐁Y</button>
        </div>

        <div></div>
      </div>
    )
  }
}

export default Controls;
