const { getBranches, editBranch, deleteBranch, getBranch } = require('../logic/branchlogic')

const express = require('express'), router = express.Router()

// GET : /branch/
router.get('/', async (req, res) => {
    try {
        const branches = await getBranches()
        res.status(200).send(branches)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


// GET : /branch/
router.get('/byId/:id', async (req, res) => {
    try {
        const branches = await getBranch(req.params.id)
        res.status(200).send(branches)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// POST : /branch/
router.post('/', async (req, res) => {
    try {
        const branches = await getBranches()
        res.status(200).send(branches)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// PUT : /branch/
router.put('/', async (req, res) => {
    try {
        const edittedBranch = await editBranch(req.body)
        res.status(200).send(edittedBranch)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// DELETE : /branch/
router.delete('/:id', async (req, res) => {
    try {
        const deletedBranch = await deleteBranch(req.params.id)
        res.status(200).send(deletedBranch)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router

