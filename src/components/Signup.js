import React, { Component } from 'react'
import { Grid, Row, Col, FormGroup, FormControl, ControlLabel, Button, Alert } from 'react-bootstrap'

const Api = require('../lib/Api.js')

class AuthSignIn extends Component {

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>

            {this.getFormErrors().length > 0 && this.state.formSubmitted &&
              <Alert bsStyle="danger">
                <strong>ya dun goofed as such:</strong>
                <ul>
                {
                  this.getFormErrors().map((message,index) =>
                    <li key={'error_message_'+index}>{message}</li>
                  )
                }
                </ul>
              </Alert>
            }

            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>email</ControlLabel>
                <FormControl
                  id="authEmail"
                  type="email"
                  label="Email address"
                  onChange={this.setEmail}
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel>password</ControlLabel>
                <FormControl
                  id="authPassword"
                  type="password"
                  label="Password"
                  onChange={this.setPassword}
                />
              </FormGroup>

              <Button type="submit">
                Login
              </Button>

            </form>
          </Col>
        </Row>
      </Grid>
    )
  }

  defaultState() {
    return {
      email: {
        value: '',
        error: 'e👏mail👏'
      },
      password: {
        value: '',
        error: 'pass👏word👏'
      },
      submit: {
        error: ''
      },
      formSubmitted: false
    }
  }

  constructor(props) {
    super(props)

    this.state = this.defaultState()

    this.handleSubmit = this.handleSubmit.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.setEmail = this.setEmail.bind(this)
  }

  getFormErrors() {
    let fields = ['email', 'password', 'submit']
    let errors = []
    fields.map(field => {
      let fieldError = this.state[field].error || ''
      if (fieldError.length > 0) {
        errors.push(fieldError)
      }
    })
    return errors
  }

  setEmail(event) {
    let newVal = event.target.value || ''
    let errorMessage = newVal.length === 0 ? 'Email is required.' : ''
    this.setState({
      email: {
        value: newVal,
        error: errorMessage
      },
      submit: {
        error: ''
      }
    })
  }

  setPassword(event) {
    let newVal = event.target.value || ''
    let errorMessage = newVal.length === 0 ? 'Password is required.' : ''
    this.setState({
      password: {
        value: newVal,
        error: errorMessage
      },
      submit: {
        error: ''
      }
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      formSubmitted: true,
      submit: {
        error: ''
      }
    })

    if (this.getFormErrors().length > 0) {
      return false
    }

    // try
    // fetch('http://localhost:3000/api/user/token', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: this.state.email.value,
    //     password: this.state.password.value,
    //   })
    // })
    // .then(jwt => {
    //   if (jwt) {
    //     this.props.propagateSignIn(jwt, this.props.history)
    //   }
    //   else {
    //     this.setState({
    //       submit: {
    //         error: 'Sorry, we could not log you in with the credentials provided. Please try again.'
    //       }
    //     })
    //   }
    // }

    Api.createAccount(this.state.email.value, this.state.password.value).then(jwt => {
      if (jwt) {
        this.props.propagateSignIn(jwt, this.props.history)
      }
      else {
        this.setState({
          submit: {
            error: 'bad creds 💁 try again'
          }
        })
      }
    })
  }
}

export default AuthSignIn
