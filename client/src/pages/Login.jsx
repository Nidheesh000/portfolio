import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLock, FiUser } from 'react-icons/fi';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { admin, login } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (admin) {
      navigate('/admin');
    }
  }, [admin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    const res = await login(username, password);
    setLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.message);
    }
  };

  return (
    <section 
      className="d-flex align-items-center"
      style={{
        minHeight: 'calc(100vh - 180px)',
      }}
    >
      <Container>
        <Card 
          className="glass-panel mx-auto border-0 p-4 p-md-5 rounded-4 shadow-lg"
          style={{ maxWidth: '480px' }}
        >
          <div className="text-center mb-4">
            <div 
              className="d-inline-flex justify-content-center align-items-center rounded-circle mb-3"
              style={{
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(99, 102, 241, 0.12)',
                color: 'var(--accent-color)',
              }}
            >
              <FiLock size={28} />
            </div>
            <h3 className="fw-bold">Admin Portal</h3>
            <p className="text-muted small">Sign in to manage your portfolio site</p>
          </div>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label className="fw-semibold small">Username</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control-custom ps-5"
                  disabled={loading}
                />
                <FiUser 
                  className="position-absolute translate-middle-y"
                  style={{ top: '50%', left: '16px', color: 'var(--text-secondary)' }}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Label className="fw-semibold small">Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control-custom ps-5"
                  disabled={loading}
                />
                <FiLock 
                  className="position-absolute translate-middle-y"
                  style={{ top: '50%', left: '16px', color: 'var(--text-secondary)' }}
                />
              </div>
            </Form.Group>

            <Button
              type="submit"
              disabled={loading}
              className="glow-btn w-100 py-3"
            >
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" /> Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </Form>
        </Card>
      </Container>
    </section>
  );
};

export default Login;
