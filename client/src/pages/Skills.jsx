import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { getSkills } from '../services/api';
import Loading from '../components/Loading';

const MOCK_SKILLS = [
  { name: 'React.js', category: 'Frontend', proficiency: 90 },
  { name: 'JavaScript (ES6+)', category: 'Frontend', proficiency: 95 },
  { name: 'Bootstrap / React-Bootstrap', category: 'Frontend', proficiency: 85 },
  { name: 'HTML5 & CSS3', category: 'Frontend', proficiency: 95 },
  { name: 'Node.js', category: 'Backend', proficiency: 80 },
  { name: 'Express.js', category: 'Backend', proficiency: 85 },
  { name: 'RESTful APIs', category: 'Backend', proficiency: 90 },
  { name: 'MongoDB / Mongoose', category: 'Database', proficiency: 80 },
  { name: 'Git & GitHub', category: 'Tools', proficiency: 85 },
  { name: 'Docker', category: 'Tools', proficiency: 70 },
];

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getSkills();
        if (data && data.length > 0) {
          setSkills(data);
        } else {
          setSkills(MOCK_SKILLS);
        }
      } catch (err) {
        console.error('Failed to fetch skills from database, utilizing mock data', err);
        setSkills(MOCK_SKILLS);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Helper to filter skills by category
  const getSkillsByCategory = (category) => {
    return skills.filter((skill) => skill.category === category);
  };

  const categories = ['Frontend', 'Backend', 'Database', 'Tools'];

  return (
    <section id="skills" className="py-5">
      <Container className="py-4">
        <div className="text-center mb-5">
          <h2 className="section-title">My Skills</h2>
          <p className="text-secondary col-lg-8 mx-auto mt-2">
            Here is my level of expertise across various development disciplines. I'm constantly learning new tools.
          </p>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <Row className="g-5">
            {categories.map((category, catIndex) => {
              const categorySkills = getSkillsByCategory(category);
              if (categorySkills.length === 0) return null;

              return (
                <Col md={6} key={catIndex}>
                  <div className="glass-panel p-4 rounded-4 h-100">
                    <h3 className="fw-bold mb-4" style={{ color: 'var(--accent-color)', fontSize: '1.4rem' }}>
                      {category}
                    </h3>
                    <div className="d-flex flex-column gap-3">
                      {categorySkills.map((skill, index) => (
                        <div key={index}>
                          <div className="d-flex justify-content-between mb-1">
                            <span className="fw-semibold" style={{ fontSize: '0.95rem' }}>{skill.name}</span>
                            <span className="text-muted small">{skill.proficiency}%</span>
                          </div>
                          <ProgressBar 
                            now={skill.proficiency} 
                            className="custom-progress" 
                            barClassName="custom-progress-bar"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Skills;
