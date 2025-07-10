const app = require('./app');
const http = require('http');
const logger = require('./utils/logger');
const mqttService = require('./services/mqttService');

require('dotenv').config();



// Load environment variables
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
  
  // Initialize MQTT service
  mqttService;
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});