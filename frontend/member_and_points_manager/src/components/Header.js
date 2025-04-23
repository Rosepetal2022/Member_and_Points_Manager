
import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

const Header = () => {
    return (
        <>
            <Navbar
                className="my-2"
                color="dark"
                dark
            >
                <NavbarBrand href="/">
                    <img
                        alt="logo"
                        src="/logo-white.svg"
                        style={{
                            height: 40,
                            width: 40
                        }}
                    />
                </NavbarBrand>
                <NavItem>
                    <NavLink href="/Login">Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/AdminHome">Admin</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/MemberHome">Members</NavLink>
                </NavItem>

            </Navbar>
        </>
    );
};

export default Header;
