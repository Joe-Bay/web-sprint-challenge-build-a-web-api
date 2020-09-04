const express = require('express')
const ProjectsDB = require('../data/helpers/projectModel')
const ActionsDB = require('../data/helpers/actionModel')
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

router.get('/:id/actions', (req, res) => { // this will list all the actions on a particular project
    ProjectsDB.get(req.params.id)
    .then(project => {
        if(project === null){
            res.status(404).json({message: "Could not find the project with that id"})
        } else {
    ProjectsDB.getProjectActions(req.params.id)
    .then(listActions => {
        res.status(200).json(listActions)
    }) 
    .catch(() => {
        res.status(500).json({message: "There was an error retrieving the actions for this project"})
    })           
        }
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
router.post('/:id/actions', (req, res) => {
    const postData = { ...req.body, project_id: req.params.id }
    console.log(postData)
    ActionsDB.insert(postData)
    .then(newAction => {
      
         if(newAction.description.length > 128){
            res.status(400).json({message: 'Only 128 characters allowed in description'})
        } else if(!newAction.description || !newAction.notes){
            res.status(400).json({message: "Please enter the notes and description fields"})
        } else {
            res.status(201).json(newAction)
        }
    })
    .catch(() => {
        res.status(404).json({message: 'Could not find project with that id'})
    })
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