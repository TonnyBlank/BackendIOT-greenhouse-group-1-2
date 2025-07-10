const logger = require('../utils/logger');

module.exports = (error, req, res, next) => {
  logger.error(error.stack);
  
  const status = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';
  const data = error.data;
  
  res.status(status).json({ message, data });
};