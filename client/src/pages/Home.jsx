import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Resume from './Resume';
import Contact from './Contact';

const Home = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-wrapper">
      {/* Animated Hero Section */}
      <section 
        id="home" 
        className="d-flex align-items-center"
        style={{
          minHeight: 'calc(100vh - 80px)',
          position: 'relative',
          overflow: 'hidden',
          padding: '40px 0',
        }}
      >
        {/* Background Glowing Shapes */}
        <div
          className="position-absolute"
          style={{
            top: '10%',
            right: '5%',
            width: '350px',
            height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(40px)',
            zIndex: 0,
          }}
        />
        <div
          className="position-absolute"
          style={{
            bottom: '10%',
            left: '5%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(30px)',
            zIndex: 0,
          }}
        />

        <Container className="position-relative" style={{ zIndex: 1 }}>
          <Row className="align-items-center g-5">
            <Col lg={7} className="animate-fade-in text-center text-lg-start">
              <span 
                className="badge mb-3 px-3 py-2 fw-semibold" 
                style={{ 
                  backgroundColor: 'rgba(99, 102, 241, 0.12)', 
                  color: 'var(--accent-color)',
                  fontSize: '0.85rem'
                }}
              >
                Available for Freelance & Contract
              </span>
              <h1 
                className="display-3 fw-extrabold mb-3" 
                style={{ 
                  letterSpacing: '-1.5px',
                  lineHeight: '1.15'
                }}
              >
                Hi, I'm a <span 
                  style={{
                    background: 'linear-gradient(45deg, var(--accent-color), var(--accent-secondary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Full Stack Developer
                </span>
              </h1>
              <p className="lead text-secondary mb-4 col-xl-10 fs-5" style={{ lineHeight: '1.7' }}>
                I craft interactive, high-performance, and visually stunning web applications. Specialized in React, Node.js, Express, and MongoDB.
              </p>
              
              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mb-4">
                <Button 
                  onClick={() => scrollToSection('projects')} 
                  className="glow-btn d-flex align-items-center gap-2 py-3 px-4 fs-6"
                >
                  View My Work <FiArrowRight />
                </Button>
                <Button 
                  onClick={() => scrollToSection('contact')} 
                  variant="outline-secondary" 
                  className="d-flex align-items-center gap-2 py-3 px-4 fs-6"
                  style={{
                    borderRadius: '50px',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                >
                  Contact Me
                </Button>
              </div>

              {/* Social links */}
              <div className="d-flex justify-content-center justify-content-lg-start gap-4">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-secondary hover-primary"
                  aria-label="GitHub Link"
                  style={{ fontSize: '1.25rem' }}
                >
                  <FiGithub />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-secondary hover-primary"
                  aria-label="LinkedIn Link"
                  style={{ fontSize: '1.25rem' }}
                >
                  <FiLinkedin />
                </a>
                <a 
                  href="mailto:your-email@example.com" 
                  className="text-secondary hover-primary"
                  aria-label="Email Link"
                  style={{ fontSize: '1.25rem' }}
                >
                  <FiMail />
                </a>
              </div>
            </Col>

            <Col lg={5} className="d-none d-lg-block text-center position-relative">
              {/* Decorative Tech Stack Floating Panel */}
              <div 
                className="animate-float"
                style={{
                  width: '100%',
                  maxHeight: '400px',
                  borderRadius: '30px',
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(168,85,247,0.08) 100%)',
                  padding: '40px',
                  border: '1px solid var(--glass-border)',
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=500&auto=format&fit=crop&q=80" 
                  alt="Dev Graphics" 
                  className="img-fluid rounded-4 shadow-lg"
                  style={{ objectFit: 'cover', width: '100%', height: '300px' }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Me Section */}
      <About />

      {/* Skills Section */}
      <Skills />

      {/* Projects Section */}
      <Projects />

      {/* Resume Section */}
      <Resume />

      {/* Contact Section */}
      <Contact />
    </div>
  );
};

export default Home;
