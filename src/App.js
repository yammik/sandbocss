import React from 'react'
import './App.css';
import { CookiesProvider } from 'react-cookie'
import TokenAuth from './components/TokenAuth'
import Main from './components/Main'

class App extends React.Component {
  render() {
    return (
      <Main/>
    )
  }
}

App.defaultProps = {}

export default App;
