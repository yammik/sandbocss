import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class AppHeader extends Component {

  render() {
    return (
      <Navbar inverse collapseOnSelect>
          <Nav>
            <LinkContainer exact to="/" onClick={() => window.location.reload()}>
              <NavItem eventKey={1}>
                sandboCSS
              </NavItem>
            </LinkContainer>
          </Nav>
      </Navbar>
    )
  }

  constructor(props) {
    super(props)
  }

}

export default AppHeader
