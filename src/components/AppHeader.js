import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class AppHeader extends Component {

  render() {
    return (
      <Navbar inverse collapseOnSelect>
          <Nav>
            <LinkContainer exact to="/">
              <NavItem eventKey={1}>
                sandboCSS
              </NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            {!this.props.appState.jwt &&
              <LinkContainer exact to="/sign-in">
                <NavItem eventKey={3}>
                  sign in
                </NavItem>
              </LinkContainer>
            }

            {this.props.appState.jwt &&
              <LinkContainer exact to="/sign-out">
                <NavItem eventKey={4}>
                  sign out
                </NavItem>
              </LinkContainer>
            }
          </Nav>
      </Navbar>
    )
  }

  constructor(props) {
    super(props)
  }

}

export default AppHeader
