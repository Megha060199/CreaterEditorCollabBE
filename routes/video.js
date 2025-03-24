import express from 'express';
import { uploadFromUrl } from '../controllers/videoController.js';

const router = express.Router();
router.post('/uploadYoutube', uploadFromUrl);

export default router;
