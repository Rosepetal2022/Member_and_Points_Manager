import React from 'react';
import Auth from '../utils/auth';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    const isLoggedIn = Auth.loggedIn();

    return (
        <Navbar className="my-2" color="dark" dark expand="md">
            <NavbarBrand href="/">
                <img
                    alt="logo"
                    src={require('../images/logo.png')}
                    style={{ height: 150, width: 150 }}
                />
            </NavbarBrand>
            <Nav className="ml-auto" navbar>
                {!isLoggedIn && (
                    <>
                        <NavItem>
                            <NavLink href="/Login">Login</NavLink>
                        </NavItem>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <NavItem>
                            <NavLink href="/Logout">Logout</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/AdminHome">Admin</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/MemberHome">Dashboard</NavLink>
                        </NavItem>
                    </>
                )}
                {/* Always visible */}
                <NavItem>
                    <NavLink href="/Points">All Points</NavLink>
                </NavItem>
            </Nav>
        </Navbar>
    );
};

export default Header;

