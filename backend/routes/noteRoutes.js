const express = require('express')
const router = express.Router({mergeParams: true})

const {protect} = require('../middleware/authMiddleware')
const {addNote, getNotes} = require("../controllers/noteController");

router.get('/', protect, getNotes)
router.post('/', protect, addNote)

module.exports = router