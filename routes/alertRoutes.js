const express = require('express');
const router = express.Router();
const alertController = require('../controllers/alertContoller');
const authMiddleware = require('../middlewares/auth');

router.get('/:deviceId', authMiddleware, alertController.getAlerts);
router.put('/:alertId/resolve', authMiddleware, alertController.resolveAlert);
router.get('/:deviceId/unresolved-count', authMiddleware, alertController.getUnresolvedAlertsCount);

module.exports = router;