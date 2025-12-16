const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const auth = require('../middlewares/auth.middleware');

// @route   GET api/projects
// @desc    Get all projects
// @access  Public
router.get('/', projectController.getProjects);

// @route   POST api/projects
// @desc    Create a project
// @access  Private
router.post('/', auth, projectController.createProject);

// @route   PUT api/projects/:id
// @desc    Update a project
// @access  Private
router.put('/:id', auth, projectController.updateProject);

// @route   DELETE api/projects/:id
// @desc    Delete a project
// @access  Private
router.delete('/:id', auth, projectController.deleteProject);

module.exports = router;
