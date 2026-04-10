import express from 'express';
import registerEmployeeController from '../controllers/registerEmployeeController.js';

const router = express.Router();

router.route("/").post(registerEmployeeController.registerEmployee);
router.route("/verifyCodeEmail").post(registerEmployeeController.verifyEmail);

export default router; 