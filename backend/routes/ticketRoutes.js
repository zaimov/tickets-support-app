const express = require('express')
const router = express.Router()
const {getTickets, createTicket, getTicket, updateTicket, deleteTicket} = require('../controllers/ticketController')

const {protect} = require('../middleware/authMiddleware')

const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

router.get('/', protect, getTickets)
router.post('/', protect, createTicket)
router.get('/:id', protect, getTicket)
router.put('/:id', protect, updateTicket)
router.delete('/:id', protect, deleteTicket)


module.exports = router