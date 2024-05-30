import express from 'express';
import { createUser, getUsers, deleteUsers } from '../controllers/userController.js';

const router = express.Router();

router.post('/users', createUser);
router.get('/users', getUsers);
router.delete('/users', deleteUsers)

export default router;