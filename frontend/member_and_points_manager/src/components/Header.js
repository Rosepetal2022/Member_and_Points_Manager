
import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Header = () => {
    return (
        <Navbar className="my-2" color="dark" dark expand="md">
                <NavbarBrand href="/">
                LOGO Goes Here
                    {/* <img
                        alt="logo"
                        src="/logo-white.svg"
                        style={{
                            height: 40,
                            width: 40
                        }}
                    /> */}
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
                </Nav>
        </Navbar>
    );
};

export default Header;

