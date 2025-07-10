const express = require('express');
const router = express.Router();
const {
  storeSensorData,
  getLatestSensorData,
  getSensorHistory
} = require('../controllers/sensorController');
const authMiddleware = require('../middlewares/auth');

router.get('/test', (req, res) => {
  res.send('Route test successful');
});

router.post('/', storeSensorData);
router.get('/:deviceId/latest', authMiddleware, getLatestSensorData);
router.get('/:deviceId/history/:hours', authMiddleware, getSensorHistory);

module.exports = router;
