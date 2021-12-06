import React from 'react'
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../actions/userActions.js'

const Header = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin

    const logoutHandler = () => {
       dispatch(logout())
    }

    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to={'/'}>Huzaifa Aneel Test</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                        <Nav.Link as={Link} to={'/'}>
                            <i className='fas fa-home'></i>Home
                        </Nav.Link>
                        {userInfo ? (
                           <NavDropdown title={userInfo.name} id='username'>
                               
                                <NavDropdown.Item className='ms-auto' as={Link} to={'/profile'}>
                                    Profile
                                </NavDropdown.Item>


                               <NavDropdown.Item className='ms-auto' onClick={logoutHandler}>
                                   Logout
                               </NavDropdown.Item>
                           </NavDropdown>
                        ) 
                        : 
                            <Nav.Link as={Link} to={'/login'}>
                                <i className='fas fa-user'></i>Sign In
                            </Nav.Link>
                         }
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
