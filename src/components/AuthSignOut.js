import React, { Component } from 'react'

class AuthSignOut extends Component {
  render() {
    return null
  }

  constructor(props) {
    super(props)
    this.props.propagateSignOut(this.props.history)
  }
}

export default AuthSignOut
