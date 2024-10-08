import express from 'express';
import { test ,updateUser,deleteUser,signout,getUserListings,getUser} from '../controller/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router =express.Router();

router.get('/signup',test)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.get('/signout',signout)
router.get('/listings/:id',verifyToken,getUserListings);
router.get('/:id',verifyToken,getUser)
export default router;