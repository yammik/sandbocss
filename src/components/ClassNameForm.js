import React, { Component } from 'react';

class ClassNameForm extends Component {
  constructor() {
    super();
    this.state = {
      className: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      className: e.target.value,
    })
  }

  // where new divs are made
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addDiv(this.state.className);
    this.setState({
      className: '',
    })
    e.target.reset();
  }

  // delete currently selected div
  handleDelSubmit = (e) => {
    e.preventDefault();
    this.props.removeDiv();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="classNameForm">
        class name:
        <div>
          <input onChange={this.handleChange} className="classNameInput"></input>
          <br></br>
          <input className="submitButton" type="submit" value="➕"></input>

          <input className="submitButton delButton" type="submit" onClick={this.handleDelSubmit} value="🚮"></input>
        </div>
      </form>
    )
  }
}

export default ClassNameForm;
