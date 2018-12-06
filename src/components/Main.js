import React, { Component } from 'react';
import Navbar from "./Navbar";
import Container from "./Container";
import ModeSelect from "./ModeSelect";

class Main extends Component {
  state = {
    mode: '',
  }

  selectMode = (mode) => {
    console.log('setting state of app to', mode);
    this.setState({
      mode: mode,
    })
  }
  render() {
    const { mode } = this.state;
    return (
      <>
        <Navbar />
        { !mode ? <ModeSelect selectMode={this.selectMode} /> : <Container mode={mode} /> }
      </>
    );
  }
}

export default Main;
