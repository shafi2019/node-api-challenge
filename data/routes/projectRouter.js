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
            message: "Did not find prject data", error
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
        if(!id){
            res.status(404).json({errorMessage:`cannot find ProjectsActions ID`})
        } else {
            res.status(200).json(data)
        }
    })
    .catch(err => {
        res.status(500).json({errorMessage:`cannot grab data from ProjectsActions`})
    })
})

module.exports = router;