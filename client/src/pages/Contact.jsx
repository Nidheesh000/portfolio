import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { submitContactMessage } from '../services/api';
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertInfo, setAlertInfo] = useState({ show: false, type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);
    setAlertInfo({ show: false, type: '', message: '' });

    try {
      const response = await submitContactMessage(formData);
      if (response.success) {
        setAlertInfo({
          show: true,
          type: 'success',
          message: response.message || 'Thank you! Your message was sent successfully.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setValidated(false);
      } else {
        throw new Error(response.message || 'Something went wrong.');
      }
    } catch (error) {
      setAlertInfo({
        show: true,
        type: 'danger',
        message: error.response?.data?.message || error.message || 'Failed to send your message. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-secondary py-5">
      <Container className="py-4">
        <div className="text-center mb-5">
          <h2 className="section-title">Get In Touch</h2>
          <p className="text-secondary col-lg-8 mx-auto mt-2">
            Have a question, proposal, or want to discuss a project? Drop a message and I will get back to you shortly.
          </p>
        </div>

        <Row className="g-5 justify-content-center">
          {/* Contact Details Panel */}
          <Col lg={4}>
            <div className="d-flex flex-column gap-4 h-100 justify-content-center">
              <div className="glass-panel p-4 rounded-4 d-flex align-items-center gap-3">
                <div 
                  className="d-flex justify-content-center align-items-center rounded-3"
                  style={{ 
                    width: '50px', 
                    height: '50px', 
                    backgroundColor: 'rgba(99, 102, 241, 0.12)',
                    color: 'var(--accent-color)',
                    flexShrink: 0
                  }}
                >
                  <FiMail size={22} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1" style={{ fontSize: '1.05rem' }}>Email Me</h5>
                  <a href="mailto:your-email@example.com" className="text-secondary text-decoration-none small">
                    your-email@example.com
                  </a>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-4 d-flex align-items-center gap-3">
                <div 
                  className="d-flex justify-content-center align-items-center rounded-3"
                  style={{ 
                    width: '50px', 
                    height: '50px', 
                    backgroundColor: 'rgba(99, 102, 241, 0.12)',
                    color: 'var(--accent-color)',
                    flexShrink: 0
                  }}
                >
                  <FiPhone size={22} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1" style={{ fontSize: '1.05rem' }}>Call Me</h5>
                  <a href="tel:+1234567890" className="text-secondary text-decoration-none small">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-4 d-flex align-items-center gap-3">
                <div 
                  className="d-flex justify-content-center align-items-center rounded-3"
                  style={{ 
                    width: '50px', 
                    height: '50px', 
                    backgroundColor: 'rgba(99, 102, 241, 0.12)',
                    color: 'var(--accent-color)',
                    flexShrink: 0
                  }}
                >
                  <FiMapPin size={22} />
                </div>
                <div>
                  <h5 className="fw-bold mb-1" style={{ fontSize: '1.05rem' }}>Location</h5>
                  <p className="text-secondary small mb-0">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </Col>

          {/* Contact Form */}
          <Col lg={7}>
            <div className="glass-panel p-4 p-md-5 rounded-4">
              {alertInfo.show && (
                <Alert 
                  variant={alertInfo.type} 
                  onClose={() => setAlertInfo({ ...alertInfo, show: false })} 
                  dismissible
                  className="mb-4"
                >
                  {alertInfo.message}
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group controlId="contactName">
                      <Form.Label className="fw-semibold small">Full Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control-custom"
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group controlId="contactEmail">
                      <Form.Label className="fw-semibold small">Email Address</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control-custom"
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group controlId="contactSubject">
                      <Form.Label className="fw-semibold small">Subject</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="subject"
                        placeholder="Collaboration Proposal"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-control-custom"
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a subject.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group controlId="contactMessage">
                      <Form.Label className="fw-semibold small">Your Message</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows={5}
                        name="message"
                        placeholder="Tell me more about your project..."
                        value={formData.message}
                        onChange={handleChange}
                        className="form-control-custom"
                        disabled={loading}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please write a message.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={12} className="text-end mt-4">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="glow-btn d-inline-flex align-items-center gap-2 py-3 px-4"
                      style={{ minWidth: '160px', justifyContent: 'center' }}
                    >
                      {loading ? (
                        <>
                          <Spinner size="sm" animation="border" /> Sending...
                        </>
                      ) : (
                        <>
                          <FiSend /> Send Message
                        </>
                      )}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
