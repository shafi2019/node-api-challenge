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

module.exports = router;