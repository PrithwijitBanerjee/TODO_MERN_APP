import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import '../../styles/navbarStyles.css';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../reducers/signInReducer';
import { toast } from 'react-toastify';

const Header = () => {
    const dispatch = useDispatch();
    const { logoutToggle, name } = useSelector(state => state?.signInUsr);
    const handleSignOut = () => {
        dispatch(signOut());
        toast.error(`${name} successfully logged out !!!`, {
            theme: 'colored'
        });
    }
    return (
        <>
            <Navbar expand="lg" className="navbar-custom">
                <Container>
                    <Navbar.Brand href="#home" className='navbar-link-white'>Todo App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavLink to="/todo" className='navbar-link-white'>Todos</NavLink>
                            <NavLink to="/addTodo" className='navbar-link-white'>Add Todo</NavLink>
                            {
                                (logoutToggle) ? (<>
                                    <NavLink to="/todo" className='navbar-link-white'>Hi! {name}</NavLink>
                                    <NavLink to="/signIn" className='navbar-link-white' onClick={handleSignOut}>Sign Out</NavLink>
                                </>) : (<>
                                    <NavLink to="/signUp" className='navbar-link-white'>Sign Up</NavLink>
                                    <NavLink to="/signIn" className='navbar-link-white'>Sign In</NavLink>
                                </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header