import express from "express";
import { editIncome, getIncome, getUser, getUserById, newUser } from "../controllers/UserController.js";
import { verifyUser } from "../middleware/AuthUser.js";



const router = express.Router();

router.get('/user', verifyUser, getUser);
router.get('/user/:id', verifyUser, getUserById); 
router.post('/user', newUser);
router.patch('/user/:id', verifyUser, editIncome); 
router.get('/user/:id', verifyUser, getIncome); //delete





export default router;