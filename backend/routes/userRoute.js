const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const userUpdate = require('../controllers/userUpdate')


router.post('/signin', userController.signin)
router.post('/signup', userController.signup)
router.get('/:id', userController.profile)



module.exports = router