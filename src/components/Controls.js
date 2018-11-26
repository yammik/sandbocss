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
    const { alignCenter, alignLeft, alignRight } = this.props;
    return (
      <div id="controls">
        <form onSubmit={this.handleSubmit}>
          class name:
          <input onChange={this.handleChange}></input>
          <input type="submit"/>
        </form>
        <br></br>
        <button onClick={alignCenter}>
          center me
        </button>
        <br></br>
        <button onClick={alignLeft}>
          to da left
        </button>
        <br></br>
        <button onClick={alignRight}>
          give me rights
        </button>
      </div>
    )
  }
}

export default Controls;
