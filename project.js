const express = require('express');
const { projects } = require('./data.json');
const router = express.Router();

// redirect if no id provided
router.get('/', (req, res) => {
    res.redirect('../');
});

// select id 
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    const project = projects[id];
    // if project exists render project 
    if (project) {
        res.render('project', project);
    } else {
        //creates error object
        const error = new Error(`Project ID Does Not Exist`);
        error.status = 404;
        next(error);
    }
});

module.exports = router;