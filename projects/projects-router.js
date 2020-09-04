const express = require('express')
const ProjectsDB = require('../data/helpers/projectModel')
const router = express.Router()

router.get('/', (req, res) => {
ProjectsDB.get()
.then(allProj => {
    res.status(200).json(allProj)
})
.catch(() => {
    res.status(404).json({message: "cannot find the projects"})
})
})
router.get('/:id', (req, res) => {
    ProjectsDB.get(req.params.id)
    .then(project => {
        if(project === null){
            res.status(404).json({message: 'Could not find the project with that id'})
        } else {
        res.status(200).json(project)            
        }
    })
    .catch(() => {
        res.status(500).json({message: "There was a problem finding that project"})
    })        


})


router.post('/', (req, res) => {

    if(req.body.name && req.body.description){
    ProjectsDB.insert(req.body)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(() => {
        res.status(400).json({message: "Error: make sure to fill both name, and description fields"})
    })        
    } else {
        res.status(400).json({message: "make sure to fill both name and description fields"})
    }


})

router.put('/:id', (req, res) => {
    ProjectsDB.update(req.params.id, req.body)
    .then(updatedProject => {
        if(updatedProject === null){
            res.status(404).json({message: 'Could not find the project with that id'})
        } else {
        res.status(200).json(updatedProject)            
        }
    })
    .catch(() => {
        res.status(500).json({message: "there was an error updating this project"})
    })        
    

})

router.delete('/:id', (req, res) => {
    ProjectsDB.remove(req.params.id)
    .then(countDeleted => {
        if(countDeleted === 1){
            res.status(200).json({message: "the project has been removed"})
        } else {
            res.status(404).json({message: "Cannot find a project with that id"})
        }
    })
})

module.exports = router