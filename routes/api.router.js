import express from 'express';
import {
  getImageFromUrl,
  getImageFromBase64,
} from '../controllers/api.controller';

const router = express.Router();

router.post('/img-from-url', getImageFromUrl);
router.post('/img-from-base64', getImageFromBase64);

export default router;
