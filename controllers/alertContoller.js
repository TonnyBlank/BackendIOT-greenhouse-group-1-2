const Alert = require('../models/Alert');
const logger = require('../utils/logger');

// Get all alerts
exports.getAlerts = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { resolved, limit } = req.query;
    
    let query = { deviceId };
    
    if (resolved !== undefined) {
      query.resolved = resolved === 'true';
    }
    
    let alertsQuery = Alert.find(query).sort({ timestamp: -1 });
    
    if (limit) {
      alertsQuery = alertsQuery.limit(parseInt(limit));
    }
    
    const alerts = await alertsQuery.exec();
    
    res.json(alerts);
  } catch (error) {
    logger.error(`Error getting alerts: ${error.message}`);
    res.status(500).json({ message: 'Error getting alerts' });
  }
};

// Mark alert as resolved
exports.resolveAlert = async (req, res) => {
  try {
    const { alertId } = req.params;
    
    const alert = await Alert.findByIdAndUpdate(
      alertId,
      { resolved: true },
      { new: true }
    );
    
    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }
    
    res.json(alert);
  } catch (error) {
    logger.error(`Error resolving alert: ${error.message}`);
    res.status(500).json({ message: 'Error resolving alert' });
  }
};

// Get unresolved alerts count
exports.getUnresolvedAlertsCount = async (req, res) => {
  try {
    const { deviceId } = req.params;
    
    const count = await Alert.countDocuments({ 
      deviceId, 
      resolved: false 
    });
    
    res.json({ count });
  } catch (error) {
    logger.error(`Error getting unresolved alerts count: ${error.message}`);
    res.status(500).json({ message: 'Error getting unresolved alerts count' });
  }
};