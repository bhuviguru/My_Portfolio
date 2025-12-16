const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.createProject = async (req, res) => {
    const { title, description, imageUrl, projectLink } = req.body;
    try {
        const newProject = new Project({
            title,
            description,
            imageUrl,
            projectLink
        });
        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateProject = async (req, res) => {
    const { title, description, imageUrl, projectLink } = req.body;
    try {
        let project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });

        project.title = title || project.title;
        project.description = description || project.description;
        project.imageUrl = imageUrl || project.imageUrl;
        project.projectLink = projectLink || project.projectLink;

        await project.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteProject = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: 'Project not found' });

        await project.deleteOne();
        res.json({ msg: 'Project removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
