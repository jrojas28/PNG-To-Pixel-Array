import { getImageFromUrl } from '../controllers/api.controller';

const express = require('express');
const router = express.Router();

router.get('/img-from-url', getImageFromUrl);

export default router;