
import express from 'express';
import { getCurrentProjects } from  '../controllers/projectsController.js';

const router = express.Router();
router.get('/', getCurrentProjects );

export default router;