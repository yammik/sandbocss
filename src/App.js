import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import Container from "./components/Container"
import ModeSelect from "./components/ModeSelect"


class App extends Component {
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

export default App;
