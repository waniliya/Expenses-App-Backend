import express from "express";
import { getRecord, addRecord, deleteRecord, getRecordById, getAmount } from "../controllers/RecordController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/record', verifyUser, getRecord);
router.get('/record/:id', verifyUser, getRecordById);
router.post('/record', verifyUser, addRecord);
router.delete('/record/:id', verifyUser, deleteRecord);
router.get('/amount', verifyUser, getAmount);


export default router;