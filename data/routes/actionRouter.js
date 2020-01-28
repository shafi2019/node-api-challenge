const express = require('express');
const actionsDb = require('../helpers/actionModel.js');
const projects = require('../helpers/projectModel.js');
const router = express.Router();

router.get('/', (req, res) => {
    actionsDb.get()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({
                message: "Did not find the action", error
            })
        })
})



/*
router.post("/actions/:id", (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const newAction = { ...body, project_id: id }

    actions.insert(newAction)
        .then(action => {
            console.log(action)
            if (!action) {
                res.status(400).json({
                    message: "missing action data"
                });
            } else if (!action.description || !action.notes) {
                res.status(400).json({
                    message: "missing required description and notes fields"
                });
            } else {
                res.status(200).json({
                    Message: "Action Successfully added", action
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                errorMessage: `There was an error while saving the action ${err.res}`
            });
        });
});
*/

router.post('/:id', validateProjectId, (req, res) => {
    console.log(req.body)
    const newAction = { description: req.body.description, notes: req.body.notes, project_id: req.params.id }
    console.log(newAction)
    actionsDb.insert(newAction)
    .then(action =>{
        res.status(201).json(action);
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error adding the action', err
        });
    });
});

/*
router.post("/:id", (req, res) => {
    Actions.insert(req.id)
        .then(action => {
            console.log(action)
            res.status(201).json({
                Message: 'Action Succesfully Added', action
            });
        })
        .catch(error => {
            console.log(error)
            res.status(404).json({
                message: "can not add action", error
            });
        });
});
*/
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const data = req.body;
    actionsDb.update(id, data)
        .then(action => {
            res.status(200).json({
                Messsage: "Action Succesfully Updated", action
            });
        })
        .catch(error => {
            res.status(404).json({
                errorMessage: "Can not Update Action", error
            })
        })
});

router.delete("/:id", (req, res) => {
    actionsDb.remove(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({
                errorMessage: `could not delete action by id`, error
            })
        })
});


// Middleware
function validateProjectId(req, res, next) {
    const { id } = req.params;

    projects.get(id)
        .then(project => {
            if (project) {
                req.project = project;
                next();
            } else {
                res.status(400).json({ message: 'Error adding the action' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: err });
        });
};

module.exports = router;