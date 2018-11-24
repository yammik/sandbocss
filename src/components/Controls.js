import React, { Component } from 'react';

class Controls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      className: '',
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
    e.target.reset();
  }

  render() {
    return (
      <div id="controls">
        <form onSubmit={this.handleSubmit}>
          class name:
          <input onChange={this.handleChange}></input>
          <input type="submit"/>
        </form>
        <button onClick={this.props.addDiv}>add default div</button>
      </div>
    )
  }
}

export default Controls;
