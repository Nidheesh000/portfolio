import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FiDownload, FiBriefcase, FiBookOpen } from 'react-icons/fi';

const Resume = () => {
  const experiences = [
    {
      role: 'Senior Full Stack Developer',
      company: 'Innovate Tech Solutions',
      period: '2023 - Present',
      description: 'Lead a team of 4 frontend and backend developers to build premium SaaS interfaces. Optimized MERN application queries reducing DB response times by 35%.',
    },
    {
      role: 'Full Stack Developer',
      company: 'WebCraft Agency',
      period: '2021 - 2023',
      description: 'Developed and maintained responsive e-commerce storefronts, implemented JWT token authentication strategies, and created customizable CMS platforms.',
    },
    {
      role: 'Associate Web Developer',
      company: 'StartUp Hub',
      period: '2019 - 2021',
      description: 'Worked on front-end layouts using React, integrated third-party APIs, tracked bug tickets, and collaborated with UI designers to build client sites.',
    },
  ];

  const educations = [
    {
      degree: 'Master of Science in Computer Science',
      school: 'Tech Institute of Technology',
      period: '2017 - 2019',
      description: 'Specialized in Software Engineering and Distributed Web Systems.',
    },
    {
      degree: 'Bachelor of Computer Applications',
      school: 'State University of Science',
      period: '2014 - 2017',
      description: 'Graduated with Honors. Core coursework: Web Dev, Data Structures, OOP, SQL.',
    },
  ];

  return (
    <section id="resume" className="py-5">
      <Container className="py-4">
        <div className="text-center mb-5">
          <h2 className="section-title">Resume & CV</h2>
          <p className="text-secondary col-lg-8 mx-auto mt-2">
            Explore my educational credentials and professional career pathway. Download my complete CV below.
          </p>
        </div>

        {/* Download CV CTA */}
        <div className="text-center mb-5">
          <Button
            href="/resume.pdf"
            download
            className="glow-btn d-inline-flex align-items-center gap-2 py-3 px-4 fs-5"
          >
            <FiDownload size={20} /> Download Complete Resume (PDF)
          </Button>
        </div>

        <Row className="g-5">
          {/* Work Experience */}
          <Col lg={6}>
            <div className="d-flex align-items-center gap-3 mb-4">
              <div 
                className="d-flex justify-content-center align-items-center rounded-3"
                style={{ 
                  width: '45px', 
                  height: '45px', 
                  backgroundColor: 'rgba(99, 102, 241, 0.12)',
                  color: 'var(--accent-color)' 
                }}
              >
                <FiBriefcase size={22} />
              </div>
              <h3 className="fw-bold mb-0" style={{ fontSize: '1.6rem' }}>Work Experience</h3>
            </div>

            <div className="d-flex flex-column gap-4 border-start border-2 ps-4" style={{ borderColor: 'var(--border-color) !important' }}>
              {experiences.map((exp, index) => (
                <div key={index} className="position-relative">
                  {/* Timeline dot */}
                  <div 
                    className="position-absolute"
                    style={{
                      left: '-31px',
                      top: '6px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-color)',
                      border: '2px solid var(--bg-primary)',
                    }}
                  />
                  <span className="badge mb-2" style={{ backgroundColor: 'rgba(99, 102, 241, 0.12)', color: 'var(--accent-color)', fontWeight: '600' }}>
                    {exp.period}
                  </span>
                  <h4 className="fw-bold mb-1" style={{ fontSize: '1.2rem' }}>{exp.role}</h4>
                  <h5 className="text-muted mb-2" style={{ fontSize: '0.95rem', fontWeight: '500' }}>{exp.company}</h5>
                  <p className="text-secondary mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </Col>

          {/* Education */}
          <Col lg={6}>
            <div className="d-flex align-items-center gap-3 mb-4">
              <div 
                className="d-flex justify-content-center align-items-center rounded-3"
                style={{ 
                  width: '45px', 
                  height: '45px', 
                  backgroundColor: 'rgba(168, 85, 247, 0.12)',
                  color: 'var(--accent-secondary)' 
                }}
              >
                <FiBookOpen size={22} />
              </div>
              <h3 className="fw-bold mb-0" style={{ fontSize: '1.6rem' }}>Education</h3>
            </div>

            <div className="d-flex flex-column gap-4 border-start border-2 ps-4" style={{ borderColor: 'var(--border-color) !important' }}>
              {educations.map((edu, index) => (
                <div key={index} className="position-relative">
                  {/* Timeline dot */}
                  <div 
                    className="position-absolute"
                    style={{
                      left: '-31px',
                      top: '6px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-secondary)',
                      border: '2px solid var(--bg-primary)',
                    }}
                  />
                  <span className="badge mb-2" style={{ backgroundColor: 'rgba(168, 85, 247, 0.12)', color: 'var(--accent-secondary)', fontWeight: '600' }}>
                    {edu.period}
                  </span>
                  <h4 className="fw-bold mb-1" style={{ fontSize: '1.2rem' }}>{edu.degree}</h4>
                  <h5 className="text-muted mb-2" style={{ fontSize: '0.95rem', fontWeight: '500' }}>{edu.school}</h5>
                  <p className="text-secondary mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Resume;
