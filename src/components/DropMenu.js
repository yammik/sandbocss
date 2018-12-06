import React, { Component } from 'react';

class DropMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false,
    }
  }

  handleClick = (e) => {
    if (this.props.specific) {
      this.props.setName(this.props.specific)
    }
    this.props.setValue(e.target.name);
  }

  render() {
    return(
      <div className='propertiesOption'>
        {this.props.options.map(option => (
          <button key={option} name={option} onClick={this.handleClick}>{option}</button>
        ))}
      </div>
    )
  }

}

export default DropMenu;
