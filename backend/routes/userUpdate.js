const express = require('express')
const router = express.Router()
const userUpdate = require('../controllers/userUpdate')


router.put('/:id/updateWeight', userUpdate.updateWeight)



module.exports = router