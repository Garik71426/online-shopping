import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarToggler, Collapse,
    Nav, NavItem, NavLink 
} from 'reactstrap';

import './Header.scss';

class Header extends Component {
    state = {
        isOpen: false
    };
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };
    render() {
        return (
            <div >
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/example">Online shopping</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="example">About Us</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="example">Contacts</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="example">Social Networks</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    };
};

export default Header;
