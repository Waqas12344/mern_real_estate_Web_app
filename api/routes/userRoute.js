import express from 'express';
import { test ,updateUser} from '../controller/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router =express.Router();

router.get('/signup',test)
router.post('/update/:id',verifyToken,updateUser)

export default router;