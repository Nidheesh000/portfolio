import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FiAward, FiBriefcase, FiUsers } from 'react-icons/fi';

const About = () => {
  return (
    <section id="about" className="bg-secondary py-5">
      <Container className="py-4">
        <div className="text-center mb-5">
          <h2 className="section-title">About Me</h2>
          <p className="text-secondary col-lg-8 mx-auto mt-2">
            Get to know more about my background, career milestones, and what drives me as a software developer.
          </p>
        </div>

        <Row className="align-items-center g-5">
          <Col lg={5} className="text-center text-lg-start">
            <div className="position-relative d-inline-block">
              {/* Profile Image card decoration */}
              <div 
                className="position-absolute translate-middle-x"
                style={{
                  top: '15px',
                  left: '60%',
                  width: '100%',
                  height: '100%',
                  borderRadius: '20px',
                  background: 'linear-gradient(135deg, var(--accent-color), var(--accent-secondary))',
                  zIndex: 0,
                }}
              />
              <img
                src="c:\Users\NETCOM\Pictures\Screenshots\Screenshot 2026-05-16 142050.png"
                alt="Profile Avatar"
                className="position-relative img-fluid rounded-4 shadow-lg"
                style={{
                  zIndex: 1,
                  maxWidth: '350px',
                  objectFit: 'cover',
                  border: '4px solid var(--bg-secondary)',
                }}
              />
            </div>
          </Col>

          <Col lg={7}>
            <h3 className="fw-bold mb-3">I'm a Passionate Full-Stack Web Developer</h3>
            <p className="text-secondary mb-4" style={{ lineHeight: '1.8' }}>
              I design and build clean, modern, and performant web applications. With expertise in the MERN stack 
              (MongoDB, Express, React, Node.js), I turn complex problems into simple, beautiful, and intuitive 
              digital solutions. 
            </p>
            <p className="text-secondary mb-4" style={{ lineHeight: '1.8' }}>
              I love learning new technologies, pushing boundaries, and collaborating with cross-functional teams 
              to deliver premium software products. My goal is to always create web experiences that are both 
              highly functional and visually striking.
            </p>

            <Row className="g-4 mt-2">
              <Col sm={4}>
                <Card className="glass-panel text-center border-0 p-3 h-100">
                  <Card.Body className="p-0">
                    <FiAward size={28} className="text-primary mb-3" style={{ color: 'var(--accent-color)' }} />
                    <h5 className="fw-bold mb-1">Experience</h5>
                    <p className="text-muted small mb-0">5+ Years Coding</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4}>
                <Card className="glass-panel text-center border-0 p-3 h-100">
                  <Card.Body className="p-0">
                    <FiBriefcase size={28} className="text-primary mb-3" style={{ color: 'var(--accent-color)' }} />
                    <h5 className="fw-bold mb-1">Projects</h5>
                    <p className="text-muted small mb-0">50+ Completed</p>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4}>
                <Card className="glass-panel text-center border-0 p-3 h-100">
                  <Card.Body className="p-0">
                    <FiUsers size={28} className="text-primary mb-3" style={{ color: 'var(--accent-color)' }} />
                    <h5 className="fw-bold mb-1">Clients</h5>
                    <p className="text-muted small mb-0">100% Satisfied</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
