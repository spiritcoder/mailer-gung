const express = require('express');
const requireLogin = require('../middlewares/requireLogin')
const router = express.Router();

const dashboardController = require('../Controllers/Users/dashboard')

router.use('/dashboard',requireLogin ,dashboardController.dashboard)


module.exports = router;
