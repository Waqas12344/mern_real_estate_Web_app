import express from 'express';
import { test ,updateUser,deleteUser,signout} from '../controller/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router =express.Router();

router.get('/signup',test)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/signout',signout)

export default router;