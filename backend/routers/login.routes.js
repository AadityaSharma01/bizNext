import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { getMe, postLogin, postRegister, LogOut, deleteUser } from '../controllers/auth.controllers.js'

const router  = express.Router()

router.post('/register', postRegister)
router.post('/login', postLogin)
router.get('/me', getMe)
router.delete('/logout',authMiddleware, LogOut)
router.delete('/deleteuser', authMiddleware, deleteUser)

export default router;