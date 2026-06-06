const Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

// Helper to delete project image from disk
const deleteDiskImage = (imagePath) => {
  if (imagePath && imagePath.startsWith('/uploads/')) {
    const filePath = path.join(__dirname, '..', imagePath);
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Failed to delete local image: ${err.message}`);
    });
  }
};

// @desc    Get all projects (with optional search/filter)
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const { search, tech } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (tech) {
      query.technologies = { $regex: tech, $options: 'i' };
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const { title, description, technologies, githubLink, liveLink } = req.body;
    
    // Parse technologies (could be JSON string or array depending on form upload)
    let techArray = [];
    if (technologies) {
      techArray = Array.isArray(technologies) 
        ? technologies 
        : technologies.split(',').map(t => t.trim());
    }

    let image = '';
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (req.body.image) {
      image = req.body.image;
    }

    const project = new Project({
      title,
      description,
      image,
      technologies: techArray,
      githubLink,
      liveLink,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const { title, description, technologies, githubLink, liveLink } = req.body;
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    let techArray = project.technologies;
    if (technologies) {
      techArray = Array.isArray(technologies) 
        ? technologies 
        : technologies.split(',').map(t => t.trim());
    }

    let image = project.image;
    if (req.file) {
      // Delete old image if it was a local file
      deleteDiskImage(project.image);
      image = `/uploads/${req.file.filename}`;
    } else if (req.body.image !== undefined) {
      image = req.body.image;
    }

    project.title = title || project.title;
    project.description = description || project.description;
    project.image = image;
    project.technologies = techArray;
    project.githubLink = githubLink !== undefined ? githubLink : project.githubLink;
    project.liveLink = liveLink !== undefined ? liveLink : project.liveLink;

    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete image from disk if it's local
    deleteDiskImage(project.image);

    await project.deleteOne();
    res.json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
