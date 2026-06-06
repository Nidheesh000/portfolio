import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const ProjectCard = ({ project }) => {
  const { title, description, image, technologies, githubLink, liveLink } = project;

  // Resolve image source: checks if local upload path or absolute web URL
  const imageSrc = image
    ? image.startsWith('http') || image.startsWith('data:')
      ? image
      : `http://localhost:5000${image}`
    : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60'; // Default placeholder code screen

  return (
    <Card className="project-card border-0 bg-secondary shadow-sm">
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <Card.Img variant="top" src={imageSrc} alt={title} />
      </div>
      <Card.Body className="d-flex flex-column p-4">
        <h4 className="card-title fw-bold mb-2">{title}</h4>
        
        <Card.Text className="text-secondary mb-4 flex-grow-1" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
          {description}
        </Card.Text>

        <div className="mb-4 d-flex flex-wrap gap-2">
          {technologies &&
            technologies.map((tech, index) => (
              <Badge
                key={index}
                bg="none"
                style={{
                  backgroundColor: 'rgba(99, 102, 241, 0.12)',
                  color: 'var(--accent-color)',
                  fontWeight: '600',
                  fontSize: '0.75rem',
                  padding: '6px 12px',
                  borderRadius: '30px',
                }}
              >
                {tech}
              </Badge>
            ))}
        </div>

        <div className="d-flex gap-3 mt-auto">
          {githubLink && (
            <Button
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              variant="outline-secondary"
              className="d-flex align-items-center gap-2 w-50 justify-content-center py-2"
              style={{
                borderRadius: '8px',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)',
              }}
            >
              <FiGithub /> GitHub
            </Button>
          )}
          {liveLink && (
            <Button
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              className="glow-btn d-flex align-items-center gap-2 w-50 justify-content-center py-2"
              style={{ borderRadius: '8px' }}
            >
              <FiExternalLink /> Live Demo
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
