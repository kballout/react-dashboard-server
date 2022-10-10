const express = require('express')
const router = express.Router()
const DB = require('../modules/mongodb')
const mongo = new DB()


router.post('/:id', async (req, res) => {
    // let guild = await mongo.getAllGuildData(req.params.id)
    res.send('true')
})

module.exports = router