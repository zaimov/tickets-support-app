const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getLoggedInUser } = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware');

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/loggedInUser', protect, getLoggedInUser)

module.exports = router