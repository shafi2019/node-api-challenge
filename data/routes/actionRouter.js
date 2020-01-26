const express = require('express');
const actions = require('../helpers/actionModel.js');
const router = express.Router();

router.get('/', (req, res) => {
    actions.get()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({
                message: "Did not find the action", error
            })
        })
})


router.post('/:id', (req, res) => {
    actions.insert(req.id)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(error => {
            res.status(404).json({
                message: "can not add action", error
            })
        })
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const data = req.body;
    actions.update(id, data)
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
    actions.remove(req.params.id)
        .then(action => {
            res.status(200).json(action)
        })
        .catch(error => {
            res.status(500).json({
                errorMessage: `could not delete action by id`, error
            })
        })
});

module.exports = router;