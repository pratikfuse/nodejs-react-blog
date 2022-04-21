import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import config from '../../config';
import { useApplication } from '../../hooks/applicationContext';

export const Header: React.FC = () => {
    const { userInfo, isAuthenticated } = useApplication();

    function handleLogin() {
        window.open(`${config.baseUrl}/authenticate`, "_self");
    }

    async function handleLogout() {
        window.open(`${config.baseUrl}/auth/logout`, "_self");
    }


    return (<Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">React-blog</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">

                    <NavDropdown title={isAuthenticated && userInfo?.username ? userInfo.username : "Login"} id="basic-nav-dropdown">
                        {
                            isAuthenticated ? <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item> : <NavDropdown.Item onClick={handleLogin}>Login with Github</NavDropdown.Item>
                        }

                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>)
}