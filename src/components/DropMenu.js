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

  render() {
    return(
      <div>
        <button onClick={this.showMenu}>
          options
        </button>

        {
          this.state.showMenu ? (
            <div className='options'>
              {this.props.options.map(option => (
                <button key={option}>{option}</button>
              ))}
            </div>
          ) : (
            null
          )
        }
      </div>
    )
  }

}

export default DropMenu;
