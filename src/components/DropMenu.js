import React, { Component } from 'react';

class DropMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showMenu: false,
    }
  }

  showMenu = (e) => {
    e.preventDefault();
    this.setState({
      showMenu: true,
    }, () => {
      document.addEventListener('click', this.closeMenu);
    })
  }

  closeMenu = () => {
    this.setState({
      showMenu: false,
    }, () => {
      document.removeEventListener('click', this.closeMenu)
    })
  }

  handleClick = (e) => {
    console.log(e.target.name);
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
