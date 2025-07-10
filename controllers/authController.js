const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const logger = require('../utils/logger');

// User registration
exports.register = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      phone,
    });
    
    await user.save();
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.status(201).json({ token, userId: user._id });
  } catch (error) {
    logger.error(`Error during registration: ${error.message}`);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ token, userId: user._id });
  } catch (error) {
    logger.error(`Error during login: ${error.message}`);
    res.status(500).json({ message: 'Login failed' });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    logger.error(`Error getting user profile: ${error.message}`);
    res.status(500).json({ message: 'Error getting profile' });
  }
};

// Update notification preferences
exports.updateNotificationPreferences = async (req, res) => {
  try {
    const { email, sms, push } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { 
        notificationPreferences: { 
          email, 
          sms, 
          push 
        } 
      },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    logger.error(`Error updating notification preferences: ${error.message}`);
    res.status(500).json({ message: 'Error updating preferences' });
  }
};