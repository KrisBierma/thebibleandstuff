import React, {Component} from "react";
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./navBar.css";

class NavbarComponent extends Component {
  
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    // isOpen tells whether the hamburger menu is open (has been clicked)
    this.state = {
      isOpen: false
    };
  }

  // the toggle function changes the state of the hambger back and forth from true (is open) to false (is closed)
  toggle() {
    this.setState ({
      isOpen: !this.state.isOpen
    });
    console.log("hi")
  };

  render() {
    return (
      <div>
        <Navbar expand="md" fixed={`top`}>
            <NavbarBrand>
              <h1>The Bible and Stuff</h1>
            </NavbarBrand>

            <NavbarToggler onClick={this.toggle}>
              <span><i className="fal fa-bars fa"></i></span>
            </NavbarToggler>

            <Collapse isOpen={this.state.isOpen} navbar id="navColl">
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink onClick={this.toggle} href="#portfolio">Psalms</NavLink>
                </NavItem>
                {/* <NavItem className="pipe"> | </NavItem>
                <NavItem>
                  <NavLink onClick={this.toggle} href="#bio">Bio</NavLink>
                </NavItem>
                <NavItem className="pipe">
                  <NavLink href="/psalms"> | </NavLink></NavItem>
                <NavItem>
                  <NavLink onClick={this.toggle} href="#contact">Contact</NavLink>
                </NavItem> */}
              </Nav>
            </Collapse>
        </Navbar>  
      </div>     
    )
  }
};

export default NavbarComponent;
