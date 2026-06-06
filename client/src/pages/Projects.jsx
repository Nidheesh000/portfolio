import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { getProjects } from '../services/api';
import ProjectCard from '../components/ProjectCard';
import Loading from '../components/Loading';
import { FiSearch, FiFilter } from 'react-icons/fi';

const MOCK_PROJECTS = [
  {
    title: 'E-Commerce Platform',
    description: 'A comprehensive online storefront with shopping cart integration, secure payments processing using Stripe, and real-time inventory management dashboards.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=60',
    technologies: ['React', 'Express', 'MongoDB', 'Node.js', 'Stripe'],
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
  },
  {
    title: 'Collaborative Chat App',
    description: 'Real-time messaging web app utilizing WebSockets. Supports multiple channels, message reactions, user profile avatars, and attachment uploads.',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&auto=format&fit=crop&q=60',
    technologies: ['React', 'Socket.io', 'Node.js', 'Express', 'CSS'],
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
  },
  {
    title: 'Task Management System',
    description: 'A kanban-board styled productivity tracker. Teams can assign items, attach task checklists, write subtasks, set deadlines, and track logs.',
    image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&auto=format&fit=crop&q=60',
    technologies: ['React', 'Redux', 'Express', 'Mongoose', 'Bootstrap'],
    githubLink: 'https://github.com',
    liveLink: 'https://example.com',
  },
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects({ search: search !== '' ? search : undefined });
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          // If no search matches and db is populated, return empty. Else return mock.
          if (search !== '') {
            // Keep empty list or filter mocks
            const filteredMocks = MOCK_PROJECTS.filter(p =>
              p.title.toLowerCase().includes(search.toLowerCase()) ||
              p.description.toLowerCase().includes(search.toLowerCase())
            );
            setProjects(filteredMocks);
          } else {
            setProjects(MOCK_PROJECTS);
          }
        }
      } catch (err) {
        console.error('Failed to load database projects, defaulting to mocks', err);
        setProjects(MOCK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [search]);

  // Extract unique technologies across all projects to populate filter dropdown/buttons
  const allTechnologies = ['All', ...new Set(projects.flatMap(p => p.technologies || []))];

  const filteredProjects = selectedTech === 'All'
    ? projects
    : projects.filter(p => p.technologies.includes(selectedTech));

  return (
    <section id="projects" className="bg-secondary py-5">
      <Container className="py-4">
        <div className="text-center mb-5">
          <h2 className="section-title">My Projects</h2>
          <p className="text-secondary col-lg-8 mx-auto mt-2">
            Explore a collection of my web applications, backend systems, and client designs. Use filters or search to browse.
          </p>
        </div>

        {/* Search and Filter Panel */}
        <Row className="mb-5 justify-content-center">
          <Col md={5} className="mb-3 mb-md-0">
            <InputGroup className="glass-panel rounded-3 overflow-hidden border-0">
              <InputGroup.Text className="bg-transparent border-0 text-secondary pe-0">
                <FiSearch />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search projects by title or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border-0 shadow-none py-2 form-control-custom"
                style={{ color: 'var(--text-primary)' }}
              />
            </InputGroup>
          </Col>
          <Col md={4}>
            <InputGroup className="glass-panel rounded-3 overflow-hidden border-0">
              <InputGroup.Text className="bg-transparent border-0 text-secondary pe-0">
                <FiFilter />
              </InputGroup.Text>
              <Form.Select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="bg-transparent border-0 shadow-none py-2 form-control-custom"
                style={{ color: 'var(--text-primary)', cursor: 'pointer' }}
              >
                <option value="All">Filter by Tech: All</option>
                {allTechnologies.filter(t => t !== 'All').map((tech, idx) => (
                  <option key={idx} value={tech}>{tech}</option>
                ))}
              </Form.Select>
            </InputGroup>
          </Col>
        </Row>

        {loading ? (
          <Loading />
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-5">
            <h5 className="text-secondary">No projects match your search criteria.</h5>
            <Button 
              variant="link" 
              onClick={() => { setSearch(''); setSelectedTech('All'); }}
              style={{ color: 'var(--accent-color)', fontWeight: '600' }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            {filteredProjects.map((project, index) => (
              <Col md={6} lg={4} key={project._id || index} className="animate-fade-in">
                <ProjectCard project={project} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Projects;
