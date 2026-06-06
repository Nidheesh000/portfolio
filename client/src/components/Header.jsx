import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { FiSun, FiMoon, FiUser, FiLogOut, FiMenu } from 'react-icons/fi';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isHome = location.pathname === '/';

  return (
    <Navbar collapseOnSelect expand="lg" className="glass-navbar py-3">
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/" 
          onClick={() => isHome && window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fw-bold fs-3 text-gradient"
          style={{
            background: 'linear-gradient(45deg, var(--accent-color), var(--accent-secondary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          DevPortfolio
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="border-0 shadow-none">
          <FiMenu size={24} style={{ color: 'var(--text-primary)' }} />
        </Navbar.Toggle>
        
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            {isHome ? (
              <>
                <Nav.Link onClick={() => handleNavClick('home')} className="nav-link-custom">Home</Nav.Link>
                <Nav.Link onClick={() => handleNavClick('about')} className="nav-link-custom">About</Nav.Link>
                <Nav.Link onClick={() => handleNavClick('skills')} className="nav-link-custom">Skills</Nav.Link>
                <Nav.Link onClick={() => handleNavClick('projects')} className="nav-link-custom">Projects</Nav.Link>
                <Nav.Link onClick={() => handleNavClick('resume')} className="nav-link-custom">Resume</Nav.Link>
                <Nav.Link onClick={() => handleNavClick('contact')} className="nav-link-custom">Contact</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/" className="nav-link-custom">Home</Nav.Link>
              </>
            )}

            {admin ? (
              <>
                <Nav.Link as={Link} to="/admin" className="nav-link-custom fw-semibold text-primary">
                  <FiUser className="me-1" /> Dashboard
                </Nav.Link>
                <Button 
                  variant="link" 
                  onClick={logout} 
                  className="nav-link-custom text-danger text-start d-flex align-items-center border-0 bg-transparent p-0 ms-0 ms-lg-3 my-2 my-lg-0"
                >
                  <FiLogOut className="me-1" /> Logout
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="nav-link-custom">
                <FiUser className="me-1" /> Login
              </Nav.Link>
            )}

            <Button
              variant="link"
              onClick={toggleTheme}
              className="text-primary ms-0 ms-lg-3 p-0 mt-2 mt-lg-0 border-0 bg-transparent text-start"
              aria-label="Toggle Theme"
              style={{ color: 'var(--text-primary)' }}
            >
              {theme === 'light' ? (
                <FiMoon size={20} style={{ color: 'var(--text-primary)' }} />
              ) : (
                <FiSun size={20} style={{ color: 'var(--text-primary)' }} />
              )}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
