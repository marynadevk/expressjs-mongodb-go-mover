import express from 'express';
import { driversController } from '../controllers/drivers-controller.js';

const router = express.Router();

router.post('/api/drivers', driversController.createDriver);
router.put('/api/drivers/:id', driversController.editDriver);
router.delete('/api/drivers/:id', driversController.deleteDriver);
router.get('/api/drivers', driversController.index);

export const driversRouter = router;
