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
            message: "Action did not find"
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
            message: "can not be added"
        })
    })
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const body = req.body;
    actions.update(id, body)
    .then(action => {
        res.status(200),json(action)
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
            errorMessage:`could not delete action by id`, error
        })
    })
});

module.exports = router;