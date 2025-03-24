
import express from 'express';
import { getEditorListings } from '../controllers/contentEditorController.js';

const router = express.Router();
router.get('/', getEditorListings);

export default router;