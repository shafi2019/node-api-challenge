const express = require('express');
const projects = require('../helpers/projectModel.js');

const router = express.Router();

router.get('/', (req, res) => {
    projects.get()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({
                message: "Did not find project data", error
            })
        })
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    projects
        .get(id)
        .then(data => {
            if (!id) {
                res.status(404).json({ errorMessage: `cannot find project id` });
            } else {
                res.status(200).json(data);
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: `project data not found` });
        });
});

router.get("/:id/actions", (req, res) => {
    const id = req.params.id;
    projects.getProjectActions(id)
        .then(data => {
            if (!id) {
                res.status(404).json({ errorMessage: `cannot find ProjectsActions ID` })
            } else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: `cannot grab data from ProjectsActions` })
        })
});

router.post("/", (req, res) => {
    projects.insert(req.body)
        .then(project => {
            res.status(201).json({ 
                Message: "Project Successfully Added", project});
        })
        .catch(error => {
            console.log(error);
            res.status(404).json({
            message: "Projec did not added"
            });
        });
});




router.put("/:id", (req, res) => {
    const id = req.params.id;
    const data = req.body;
    projects.update(id, data)
        .then(project => {
            if (!id) {
                res.status(404).json({ message: "project id does not exist" });
            } else if (!req.body.name || !req.body.description) {
                res.status(400).json({
                    errorMessage: "missing a Name and Description"
                });
            } else {
                res.status(200).json(project);
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The project information could not be modified.",
                err
            });
        });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    projects.remove(id)
        .then(data => {
            if (!req.params.id) {
                res.status(404).json({ errorMessage: `project id not found` })
            } else {
                res.status(200).json({
                    message: "Project Successfully Deleted", data
                })
            }
        })
        .catch(err => {
            res.status(500).json({ errorMessage: `cannot delete project`, err })
        })

});

module.exports = router;