
import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
    return (
        <Navbar className="my-2" color="dark" dark expand="md">
                <NavbarBrand href="/">
                    <img
                        alt="logo"
                        src={require('../images/logo.png')} 
                        style={{
                            height: 150,
                            width: 150
                        }}
                    />
                </NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/Login">Login</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/AdminHome">Admin</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/MemberHome">Members</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/Points">All Points</NavLink>
                    </NavItem>
                </Nav>
        </Navbar>
    );
};

export default Header;

