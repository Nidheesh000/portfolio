import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <h5 className="fw-bold mb-1">Developer Portfolio</h5>
            <p className="mb-0 text-muted small">
              Built with React, Express, MongoDB, and Bootstrap.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-secondary hover-primary"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-secondary hover-primary"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-secondary hover-primary"
                aria-label="Twitter"
              >
                <FiTwitter size={20} />
              </a>
              <a 
                href="mailto:your-email@example.com" 
                className="text-secondary hover-primary"
                aria-label="Email"
              >
                <FiMail size={20} />
              </a>
            </div>
            <p className="mb-0 text-muted small">
              &copy; {currentYear} DevPortfolio. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
