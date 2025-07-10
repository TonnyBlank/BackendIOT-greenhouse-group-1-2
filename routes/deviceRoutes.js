const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceContoller');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, deviceController.registerDevice);
router.get('/', authMiddleware, deviceController.getUserDevices);
router.get('/:deviceId', authMiddleware, deviceController.getDeviceDetails);
router.put('/:deviceId/thresholds', authMiddleware, deviceController.updateDeviceThresholds);

module.exports = router;