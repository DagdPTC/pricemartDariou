import express from 'express';
import registerClientController from '../controllers/registerClientsController.js';

const router = express.Router();

router.route("/").post(registerClientController.registerClient);
router.route("/verifyCodeEmail").post(registerClientController.verifyEmail);

export default router; 