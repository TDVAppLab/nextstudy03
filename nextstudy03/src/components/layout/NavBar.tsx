//import { observer } from 'mobx-react-lite';
import React from 'react';
//import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown, NavLink } from 'react-bootstrap';
//import { useStore } from '../stores/store';
//import { toast } from 'react-toastify';

export default function NavBar() {
    /*
    const {userStore: {user, logout}} = useStore();
    const navigate = useNavigate();

    
    function handleLogout() {
        logout();
        toast.info('successfully logged out');
        navigate(`/`);
    }*/

    return(
        <Navbar bg="dark" variant="dark" expand="sm" className="border-bottom box-shadow mb-3">
            <Container>
                <Navbar.Brand as={NavLink} to="/">SatelliTrack</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {
                            true && 
                                <>
                                    <Nav.Link as={NavLink} to="/modelfiles">Modelfiles</Nav.Link>
                                    <Nav.Link as={NavLink} to="/attachmentfiles">Attachmentfiles</Nav.Link>
                                </>
                        }
                    </Nav>
                    <Nav>
                        <Nav.Link as={NavLink} to="/privacy">PrivacyPolicy</Nav.Link>                        
                        {
                            true ? 
                                <>

                                    <NavDropdown title={"dummy username"} id="collasible-nav-dropdown-user">
                                        <NavDropdown.Item as={NavLink} to="/register">register</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/websitesettings">WebsiteSettings</NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/batchlog">batchlog</NavDropdown.Item>
                                        { process.env.NODE_ENV === 'development' &&  <NavDropdown.Item as={NavLink} to="/errors">Errors</NavDropdown.Item>  }     
                                        <NavDropdown.Divider />
                                    </NavDropdown>
                                    
                                </>                            
                                :
                                <>
                                    { process.env.NODE_ENV === 'development' &&  <Nav.Link as={NavLink} to="/login">Login</Nav.Link>  }                   
                                </>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}