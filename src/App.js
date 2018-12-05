import React from 'react'
import './App.css';
import { CookiesProvider } from 'react-cookie'
import TokenAuth from './components/TokenAuth'

class App extends React.Component {
  render() {
    return (
      <CookiesProvider>
        <TokenAuth />
      </CookiesProvider>
    )
  }
}

App.defaultProps = {}

export default App;
