const express = require('express');
const router = express.Router();
const actuatorController = require('../controllers/actuatorsControllers');
// const authMiddleware = require('../middlewares/auth'); // Uncomment if needed

// Get current actuator state by deviceId
router.get('/:deviceId', actuatorController.getActuatorState);

// Update actuator state by deviceId
router.put('/:deviceId', actuatorController.updateActuatorState);

// Get actuator history in the last `n` hours
router.get('/:deviceId/history/:hours', actuatorController.getActuatorHistory);

module.exports = router;
