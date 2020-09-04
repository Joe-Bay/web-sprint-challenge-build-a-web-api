const express = require('express')
const ActionsDB = require('../data/helpers/actionModel')
const router = express.Router()

router.get('/', (req, res) => {
    ActionsDB.get()
    .then(allActions => {
        res.status(200).json(allActions)
    })
    .catch(() => {
        res.status(404).json({message: "Could not find any actions"})
    })
})

router.get('/:id', (req,res) => {
    ActionsDB.get(req.params.id)
    .then(action => {
        if(action === null){
            res.status(404).json({message: 'Could not find the action with that id'})
        } else {
        res.status(200).json(action)            
        }       
    })
})

// router.post('/:id', (req, res) => {
//     const postData = { project_id: req.params.id, ...req.body }
//     console.log(postData)
//     ActionsDB.insert(req.body)
//     .then(newAction => {
//         if(newAction.project_id === null){
//             res.status(404).json({message: 'Could not find the project with that id'})
//         } else if(newAction.description.str.length > 128){
//             res.status(400).json({message: 'Only 128 characters allowed in description'})
//         } else if(newAction.description && newAction.notes){
//             res.status(201).json(newAction)
//         }
//     })
//     .catch(() => {
//         res.status(500).json({message: 'There was an error posting this action'})
//     })
// })

router.put('/:id', (req, res) => {
    ActionsDB.update(req.params.id, req.body)
    .then(updatedComment => {
        if(updatedComment === null){
            res.status(404).json({message: "could not find the action with that id"})
        } else {
            res.status(200).json(updatedComment)
        }
    })
    .catch(() => {
        res.status(500).json({ message: "There was an error updating this action"})
    })
})

router.delete('/:id', (req, res) => {
    ActionsDB.remove(req.params.id)
    .then(countDeleted => {
        if(countDeleted === 1){
            res.status(200).json({message: 'the action has been removed'})
        } else {
            res.status(404).json({message: "could not find the action with that id"})
        }
    })
    .catch(() => {
        res.status(500).json({message: "Error deleting this action"})
    })
})



module.exports = router