import React, { Component } from 'react';

class ModeSelect extends Component {
  handleClick = (e) => {
    this.props.selectMode(e.target.name);
  }

  render() {
    return (
      <div id="selectMode">
        <button className='modeSelection' name='classic' onClick={this.handleClick}>
          classic
        </button>
        <button className='modeSelection' name='interactive' onClick={this.handleClick}>
          interactive
        </button>
      </div>
    )
  }

}

export default ModeSelect;
