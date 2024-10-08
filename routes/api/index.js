const express = require('express');
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

const router = express.Router();

// User routes
router.use('/users', userRoutes);

// Use the thought routes
router.use('/thoughts', thoughtRoutes);

module.exports = router;
