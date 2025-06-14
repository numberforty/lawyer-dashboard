import { Router } from 'express';
import Case from '../models/Case.js';
import auth from '../middleware/auth.js';

const router = Router();

router.use(auth);

router.get('/', async (req, res) => {
  const cases = await Case.find({ owner: req.userId });
  res.json(cases);
});

router.post('/', async (req, res) => {
  try {
    const newCase = await Case.create({ ...req.body, owner: req.userId });
    res.json(newCase);
  } catch (err) {
    res.status(400).json({ message: 'Create failed' });
  }
});

router.get('/:id', async (req, res) => {
  const c = await Case.findOne({ _id: req.params.id, owner: req.userId });
  if (!c) return res.status(404).json({ message: 'Not found' });
  res.json(c);
});

router.put('/:id', async (req, res) => {
  try {
    const upd = await Case.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId },
      req.body,
      { new: true }
    );
    if (!upd) return res.status(404).json({ message: 'Not found' });
    res.json(upd);
  } catch (err) {
    res.status(400).json({ message: 'Update failed' });
  }
});

router.delete('/:id', async (req, res) => {
  const del = await Case.findOneAndDelete({ _id: req.params.id, owner: req.userId });
  if (!del) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
