import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Evidence from '../models/Evidence.js';
import auth from '../middleware/auth.js';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadPath = path.join(__dirname, '../uploads');
const upload = multer({ dest: uploadPath });

router.use(auth);

router.post('/:caseId', upload.single('file'), async (req, res) => {
  try {
    const ev = await Evidence.create({
      case: req.params.caseId,
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      path: req.file.path
    });
    res.json(ev);
  } catch (err) {
    res.status(400).json({ message: 'Upload failed' });
  }
});

router.get('/:caseId', async (req, res) => {
  const items = await Evidence.find({ case: req.params.caseId });
  res.json(items);
});

export default router;
