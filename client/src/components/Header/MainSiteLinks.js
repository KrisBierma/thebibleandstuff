import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink} from 'reactstrap';

export class MainSiteLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);    
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen});
  }

  render() {
    console.log(this.state.isOpen)
    return(
      <div>
      <Navbar expand="md">
        <NavbarToggler onClick = {this.toggle}></NavbarToggler>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href='/randomThoughts'>About</NavLink>
            </NavItem>            <NavItem>
              <NavLink href='/psalms'>Psalms</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/studies'>Studies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href='/about'>Random Thoughts</NavLink>
            </NavItem>
          </Nav>        
        </Collapse>
      </Navbar>   
      </div>  
    )
  }
  //   {/* <li><a title="Go to Kris Bierma/'s Portfolio Website" target='_blank' rel="noopener noreferrer" href='http://krisbierma.com'>Kris' Portfolio</a></li> */}
}