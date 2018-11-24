import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import Container from "./components/Container"


class App extends Component {

  render() {
    return (
      <>
        <Navbar />
        <Container />
      </>
    );
  }
}

export default App;
