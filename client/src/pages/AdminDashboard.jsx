import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Tabs, Tab, Button, Table, Modal, Form, Badge, Alert } from 'react-bootstrap';
import { 
  getDashboardStats, 
  getProjects, 
  createProject, 
  updateProject, 
  deleteProject,
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  getContactMessages,
  updateMessageStatus,
  deleteContactMessage
} from '../services/api';
import Loading from '../components/Loading';
import { 
  FiFolder, 
  FiSliders, 
  FiMessageSquare, 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiMail, 
  FiCheck, 
  FiTrash, 
  FiEye, 
  FiEyeOff, 
  FiFileText,
  FiAward
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ projects: 0, skills: 0, messages: { total: 0, unread: 0 } });
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Modals visibility state
  const [showProjModal, setShowProjModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showMsgModal, setShowMsgModal] = useState(false);

  // Forms state
  const [projForm, setProjForm] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    liveLink: '',
    image: ''
  });
  const [projFile, setProjFile] = useState(null);
  const [isProjEdit, setIsProjEdit] = useState(false);
  const [currentProjId, setCurrentProjId] = useState('');

  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Frontend',
    proficiency: 80
  });
  const [isSkillEdit, setIsSkillEdit] = useState(false);
  const [currentSkillId, setCurrentSkillId] = useState('');

  const [selectedMsg, setSelectedMsg] = useState(null);

  // Load dashboard data
  const loadData = async () => {
    try {
      setError('');
      const [statsData, projectsData, skillsData, messagesData] = await Promise.all([
        getDashboardStats(),
        getProjects(),
        getSkills(),
        getContactMessages()
      ]);
      
      setStats(statsData);
      setProjects(projectsData);
      setSkills(skillsData);
      setMessages(messagesData);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Show status triggers
  const triggerNotification = (type, message) => {
    if (type === 'success') {
      setSuccess(message);
      setTimeout(() => setSuccess(''), 4000);
    } else {
      setError(message);
      setTimeout(() => setError(''), 4000);
    }
  };

  // --- Projects Operations ---
  const handleProjOpenAdd = () => {
    setProjForm({ title: '', description: '', technologies: '', githubLink: '', liveLink: '', image: '' });
    setProjFile(null);
    setIsProjEdit(false);
    setShowProjModal(true);
  };

  const handleProjOpenEdit = (project) => {
    setProjForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      image: project.image || ''
    });
    setProjFile(null);
    setCurrentProjId(project._id);
    setIsProjEdit(true);
    setShowProjModal(true);
  };

  const handleProjSubmit = async (e) => {
    e.preventDefault();
    if (!projForm.title || !projForm.description) {
      setError('Please fill in title and description');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', projForm.title);
      formData.append('description', projForm.description);
      formData.append('technologies', projForm.technologies);
      formData.append('githubLink', projForm.githubLink);
      formData.append('liveLink', projForm.liveLink);

      if (projFile) {
        formData.append('image', projFile);
      } else {
        formData.append('image', projForm.image);
      }

      if (isProjEdit) {
        await updateProject(currentProjId, formData);
        triggerNotification('success', 'Project updated successfully');
      } else {
        await createProject(formData);
        triggerNotification('success', 'Project added successfully');
      }
      setShowProjModal(false);
      loadData();
    } catch (err) {
      triggerNotification('danger', err.response?.data?.message || 'Project submission failed');
    }
  };

  const handleProjDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        triggerNotification('success', 'Project deleted successfully');
        loadData();
      } catch (err) {
        triggerNotification('danger', 'Failed to delete project');
      }
    }
  };

  // --- Skills Operations ---
  const handleSkillOpenAdd = () => {
    setSkillForm({ name: '', category: 'Frontend', proficiency: 80 });
    setIsSkillEdit(false);
    setShowSkillModal(true);
  };

  const handleSkillOpenEdit = (skill) => {
    setSkillForm({
      name: skill.name,
      category: skill.category,
      proficiency: skill.proficiency
    });
    setCurrentSkillId(skill._id);
    setIsSkillEdit(true);
    setShowSkillModal(true);
  };

  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    if (!skillForm.name) {
      setError('Please fill in skill name');
      return;
    }

    try {
      if (isSkillEdit) {
        await updateSkill(currentSkillId, skillForm);
        triggerNotification('success', 'Skill updated successfully');
      } else {
        await createSkill(skillForm);
        triggerNotification('success', 'Skill added successfully');
      }
      setShowSkillModal(false);
      loadData();
    } catch (err) {
      triggerNotification('danger', err.response?.data?.message || 'Skill submission failed');
    }
  };

  const handleSkillDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await deleteSkill(id);
        triggerNotification('success', 'Skill deleted successfully');
        loadData();
      } catch (err) {
        triggerNotification('danger', 'Failed to delete skill');
      }
    }
  };

  // --- Messages Operations ---
  const handleMsgOpen = (msg) => {
    setSelectedMsg(msg);
    setShowMsgModal(true);
    if (!msg.isRead) {
      handleMsgToggleRead(msg._id, true);
    }
  };

  const handleMsgToggleRead = async (id, isRead) => {
    try {
      await updateMessageStatus(id, isRead);
      loadData();
    } catch (err) {
      console.error('Failed to update message status', err);
    }
  };

  const handleMsgDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteContactMessage(id);
        triggerNotification('success', 'Message deleted successfully');
        setShowMsgModal(false);
        loadData();
      } catch (err) {
        triggerNotification('danger', 'Failed to delete message');
      }
    }
  };

  if (loading) return <Loading fullPage />;

  return (
    <Container className="py-5" style={{ minHeight: 'calc(100vh - 180px)' }}>
      <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
        <div>
          <h1 className="fw-bold mb-1">Admin Dashboard</h1>
          <p className="text-secondary mb-0">Manage projects, skills and view messages</p>
        </div>
      </div>

      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Statistics Cards */}
      <Row className="g-4 mb-5">
        <Col sm={6} lg={3}>
          <Card className="glass-panel border-0 p-3 shadow-sm">
            <Card.Body className="d-flex align-items-center justify-content-between p-2">
              <div>
                <h6 className="text-muted fw-bold text-uppercase mb-1 small">Total Projects</h6>
                <h3 className="fw-extrabold mb-0">{stats.projects}</h3>
              </div>
              <div 
                className="d-flex justify-content-center align-items-center rounded-3"
                style={{ width: '50px', height: '50px', backgroundColor: 'rgba(99, 102, 241, 0.12)', color: 'var(--accent-color)' }}
              >
                <FiFolder size={24} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={3}>
          <Card className="glass-panel border-0 p-3 shadow-sm">
            <Card.Body className="d-flex align-items-center justify-content-between p-2">
              <div>
                <h6 className="text-muted fw-bold text-uppercase mb-1 small">Total Skills</h6>
                <h3 className="fw-extrabold mb-0">{stats.skills}</h3>
              </div>
              <div 
                className="d-flex justify-content-center align-items-center rounded-3"
                style={{ width: '50px', height: '50px', backgroundColor: 'rgba(168, 85, 247, 0.12)', color: 'var(--accent-secondary)' }}
              >
                <FiAward size={24} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={3}>
          <Card className="glass-panel border-0 p-3 shadow-sm">
            <Card.Body className="d-flex align-items-center justify-content-between p-2">
              <div>
                <h6 className="text-muted fw-bold text-uppercase mb-1 small">Total Messages</h6>
                <h3 className="fw-extrabold mb-0">{stats.messages.total}</h3>
              </div>
              <div 
                className="d-flex justify-content-center align-items-center rounded-3"
                style={{ width: '50px', height: '50px', backgroundColor: 'rgba(13, 110, 253, 0.12)', color: '#0d6efd' }}
              >
                <FiMessageSquare size={24} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={6} lg={3}>
          <Card 
            className="glass-panel border-0 p-3 shadow-sm"
            style={{
              borderLeft: stats.messages.unread > 0 ? '4px solid var(--accent-color)' : 'none'
            }}
          >
            <Card.Body className="d-flex align-items-center justify-content-between p-2">
              <div>
                <h6 className="text-muted fw-bold text-uppercase mb-1 small">Unread Messages</h6>
                <h3 className={`fw-extrabold mb-0 ${stats.messages.unread > 0 ? 'text-danger animate-pulse' : ''}`}>
                  {stats.messages.unread}
                </h3>
              </div>
              <div 
                className="d-flex justify-content-center align-items-center rounded-3"
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  backgroundColor: stats.messages.unread > 0 ? 'rgba(220, 53, 69, 0.12)' : 'rgba(25, 135, 84, 0.12)', 
                  color: stats.messages.unread > 0 ? '#dc3545' : '#198754' 
                }}
              >
                <FiMail size={24} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabs Layout */}
      <Card className="admin-card border-0 shadow-sm glass-panel mb-5">
        <Tabs defaultActiveKey="projects" className="border-bottom-0 mb-4" id="admin-tabs">
          {/* Projects Tab */}
          <Tab 
            eventKey="projects" 
            title={<span className="d-flex align-items-center gap-2"><FiFolder /> Projects</span>}
          >
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <h4 className="fw-bold mb-0">Projects List</h4>
              <Button onClick={handleProjOpenAdd} className="glow-btn d-flex align-items-center gap-2 py-2">
                <FiPlus /> Add Project
              </Button>
            </div>

            <div className="table-responsive">
              <Table className="custom-table" hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Technologies</th>
                    <th>GitHub Link</th>
                    <th>Live Link</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-muted">No projects found. Add your first project!</td>
                    </tr>
                  ) : (
                    projects.map((proj) => (
                      <tr key={proj._id}>
                        <td className="fw-semibold">{proj.title}</td>
                        <td>
                          <div className="d-flex flex-wrap gap-1">
                            {proj.technologies.map((t, i) => (
                              <Badge key={i} bg="secondary" style={{ fontSize: '0.75rem' }}>{t}</Badge>
                            ))}
                          </div>
                        </td>
                        <td>
                          {proj.githubLink ? (
                            <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-truncate d-inline-block small" style={{ maxWidth: '150px' }}>
                              {proj.githubLink}
                            </a>
                          ) : '-'}
                        </td>
                        <td>
                          {proj.liveLink ? (
                            <a href={proj.liveLink} target="_blank" rel="noreferrer" className="text-truncate d-inline-block small" style={{ maxWidth: '150px' }}>
                              {proj.liveLink}
                            </a>
                          ) : '-'}
                        </td>
                        <td className="text-end">
                          <Button variant="link" onClick={() => handleProjOpenEdit(proj)} className="p-1 me-2 text-primary" aria-label="Edit project">
                            <FiEdit size={18} />
                          </Button>
                          <Button variant="link" onClick={() => handleProjDelete(proj._id)} className="p-1 text-danger" aria-label="Delete project">
                            <FiTrash2 size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>

          {/* Skills Tab */}
          <Tab 
            eventKey="skills" 
            title={<span className="d-flex align-items-center gap-2"><FiSliders /> Skills</span>}
          >
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <h4 className="fw-bold mb-0">Skills List</h4>
              <Button onClick={handleSkillOpenAdd} className="glow-btn d-flex align-items-center gap-2 py-2">
                <FiPlus /> Add Skill
              </Button>
            </div>

            <div className="table-responsive">
              <Table className="custom-table" hover>
                <thead>
                  <tr>
                    <th>Skill Name</th>
                    <th>Category</th>
                    <th>Proficiency</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-muted">No skills found. Add your first skill!</td>
                    </tr>
                  ) : (
                    skills.map((skill) => (
                      <tr key={skill._id}>
                        <td className="fw-semibold">{skill.name}</td>
                        <td><Badge bg="info" className="text-dark">{skill.category}</Badge></td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="progress flex-grow-1" style={{ height: '6px', maxWidth: '150px' }}>
                              <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${skill.proficiency}%` }} aria-valuenow={skill.proficiency} aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <span className="small fw-semibold">{skill.proficiency}%</span>
                          </div>
                        </td>
                        <td className="text-end">
                          <Button variant="link" onClick={() => handleSkillOpenEdit(skill)} className="p-1 me-2 text-primary" aria-label="Edit skill">
                            <FiEdit size={18} />
                          </Button>
                          <Button variant="link" onClick={() => handleSkillDelete(skill._id)} className="p-1 text-danger" aria-label="Delete skill">
                            <FiTrash2 size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>

          {/* Messages Tab */}
          <Tab 
            eventKey="messages" 
            title={<span className="d-flex align-items-center gap-2"><FiMail /> Messages ({stats.messages.unread})</span>}
          >
            <h4 className="fw-bold mb-4">Contact Messages</h4>

            <div className="table-responsive">
              <Table className="custom-table" hover>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Date</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">No messages found.</td>
                    </tr>
                  ) : (
                    messages.map((msg) => (
                      <tr key={msg._id} className={!msg.isRead ? 'table-active fw-semibold' : ''}>
                        <td>
                          {!msg.isRead ? (
                            <Badge bg="danger">Unread</Badge>
                          ) : (
                            <Badge bg="success">Read</Badge>
                          )}
                        </td>
                        <td>{msg.name}</td>
                        <td><a href={`mailto:${msg.email}`} className="small">{msg.email}</a></td>
                        <td>{msg.subject}</td>
                        <td className="small">{new Date(msg.createdAt).toLocaleDateString()}</td>
                        <td className="text-end">
                          <Button variant="link" onClick={() => handleMsgOpen(msg)} className="p-1 me-2 text-primary" aria-label="View message">
                            <FiEye size={18} />
                          </Button>
                          <Button 
                            variant="link" 
                            onClick={() => handleMsgToggleRead(msg._id, !msg.isRead)} 
                            className={`p-1 me-2 ${msg.isRead ? 'text-warning' : 'text-success'}`}
                            title={msg.isRead ? 'Mark as Unread' : 'Mark as Read'}
                            aria-label={msg.isRead ? 'Mark message unread' : 'Mark message read'}
                          >
                            {msg.isRead ? <FiEyeOff size={18} /> : <FiCheck size={18} />}
                          </Button>
                          <Button variant="link" onClick={() => handleMsgDelete(msg._id)} className="p-1 text-danger" aria-label="Delete message">
                            <FiTrash2 size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
        </Tabs>
      </Card>

      {/* Project Modal (Add/Edit) */}
      <Modal show={showProjModal} onHide={() => setShowProjModal(false)} size="lg" centered>
        <Modal.Header closeButton className="border-bottom-0">
          <Modal.Title className="fw-bold">{isProjEdit ? 'Edit Project' : 'Add New Project'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleProjSubmit}>
          <Modal.Body className="py-0">
            <Row className="g-3">
              <Col md={12}>
                <Form.Group controlId="projTitle">
                  <Form.Label className="fw-semibold small">Project Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="E-commerce site"
                    value={projForm.title}
                    onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                    className="form-control-custom"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group controlId="projDesc">
                  <Form.Label className="fw-semibold small">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Describe the application features..."
                    value={projForm.description}
                    onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                    className="form-control-custom"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group controlId="projTech">
                  <Form.Label className="fw-semibold small">Technologies (Comma separated)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="React, Express, MongoDB, Node.js"
                    value={projForm.technologies}
                    onChange={(e) => setProjForm({ ...projForm, technologies: e.target.value })}
                    className="form-control-custom"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="projGitHub">
                  <Form.Label className="fw-semibold small">GitHub Repository Link</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://github.com/..."
                    value={projForm.githubLink}
                    onChange={(e) => setProjForm({ ...projForm, githubLink: e.target.value })}
                    className="form-control-custom"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="projLive">
                  <Form.Label className="fw-semibold small">Live Demo Link</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="https://example.com"
                    value={projForm.liveLink}
                    onChange={(e) => setProjForm({ ...projForm, liveLink: e.target.value })}
                    className="form-control-custom"
                  />
                </Form.Group>
              </Col>

              <Col md={12} className="mb-3">
                <Form.Group controlId="projImage">
                  <Form.Label className="fw-semibold small">Project Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setProjFile(e.target.files[0])}
                    className="form-control-custom mb-2"
                  />
                  <div className="text-center text-muted small py-1">OR</div>
                  <Form.Control
                    type="text"
                    placeholder="Paste image URL (if not uploading a file)"
                    value={projForm.image.startsWith('/uploads/') ? '' : projForm.image}
                    onChange={(e) => setProjForm({ ...projForm, image: e.target.value })}
                    className="form-control-custom"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-top-0 pt-0">
            <Button variant="outline-secondary" onClick={() => setShowProjModal(false)} style={{ borderRadius: '8px' }}>
              Cancel
            </Button>
            <Button type="submit" className="glow-btn" style={{ borderRadius: '8px' }}>
              {isProjEdit ? 'Save Changes' : 'Create Project'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Skill Modal (Add/Edit) */}
      <Modal show={showSkillModal} onHide={() => setShowSkillModal(false)} centered>
        <Modal.Header closeButton className="border-bottom-0">
          <Modal.Title className="fw-bold">{isSkillEdit ? 'Edit Skill' : 'Add New Skill'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSkillSubmit}>
          <Modal.Body className="py-0">
            <Form.Group className="mb-3" controlId="skillName">
              <Form.Label className="fw-semibold small">Skill Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="React.js, Node.js, Docker..."
                value={skillForm.name}
                onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                className="form-control-custom"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="skillCat">
              <Form.Label className="fw-semibold small">Category</Form.Label>
              <Form.Select
                value={skillForm.category}
                onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                className="form-control-custom"
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Tools">Tools</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="skillProf">
              <Form.Label className="fw-semibold small d-flex justify-content-between">
                <span>Proficiency Level</span>
                <span className="fw-bold" style={{ color: 'var(--accent-color)' }}>{skillForm.proficiency}%</span>
              </Form.Label>
              <Form.Range
                min="0"
                max="100"
                value={skillForm.proficiency}
                onChange={(e) => setSkillForm({ ...skillForm, proficiency: Number(e.target.value) })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-top-0 pt-0">
            <Button variant="outline-secondary" onClick={() => setShowSkillModal(false)} style={{ borderRadius: '8px' }}>
              Cancel
            </Button>
            <Button type="submit" className="glow-btn" style={{ borderRadius: '8px' }}>
              {isSkillEdit ? 'Save Changes' : 'Create Skill'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Message Reader Modal */}
      <Modal show={showMsgModal} onHide={() => setShowMsgModal(false)} size="lg" centered>
        {selectedMsg && (
          <>
            <Modal.Header closeButton className="border-bottom-0">
              <Modal.Title className="fw-bold">Contact Message</Modal.Title>
            </Modal.Header>
            <Modal.Body className="py-0">
              <div className="glass-panel p-4 rounded-4 mb-3">
                <Row className="g-2 mb-3 border-bottom pb-2">
                  <Col sm={6}>
                    <div className="small text-muted mb-1">From</div>
                    <div className="fw-bold">{selectedMsg.name}</div>
                    <a href={`mailto:${selectedMsg.email}`} className="small text-decoration-none">{selectedMsg.email}</a>
                  </Col>
                  <Col sm={6} className="text-sm-end mt-2 mt-sm-0">
                    <div className="small text-muted mb-1">Received Date</div>
                    <div className="fw-semibold">{new Date(selectedMsg.createdAt).toLocaleString()}</div>
                  </Col>
                </Row>
                
                <div className="mb-3">
                  <div className="small text-muted mb-1">Subject</div>
                  <h5 className="fw-bold">{selectedMsg.subject}</h5>
                </div>

                <div>
                  <div className="small text-muted mb-1">Message Content</div>
                  <p className="p-3 bg-light rounded-3 text-dark" style={{ whiteSpace: 'pre-line', minHeight: '100px', lineHeight: '1.6' }}>
                    {selectedMsg.message}
                  </p>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="border-top-0 pt-0 d-flex justify-content-between">
              <Button 
                variant="outline-danger" 
                onClick={() => handleMsgDelete(selectedMsg._id)}
                style={{ borderRadius: '8px' }}
              >
                <FiTrash /> Delete Message
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setShowMsgModal(false)}
                style={{ borderRadius: '8px' }}
              >
                Close Reader
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
