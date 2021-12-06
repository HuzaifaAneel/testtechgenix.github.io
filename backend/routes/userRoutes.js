import express from 'express'
const router = express.Router()
import {authUser, createLead, registerUser, getLeads, updateLead, getLeadById, sendEmail} from '../controllers/userController.js'
import {protect , leadCreator} from '../middleware/authMiddleware.js'

router.post('/', registerUser)
router.post('/login', authUser)
router.get('/leads', getLeads)

router.post('/createlead',createLead)

router.put('/:id', updateLead)
router.get('/:id', getLeadById)
router.post('/sendemail', sendEmail)





export default router