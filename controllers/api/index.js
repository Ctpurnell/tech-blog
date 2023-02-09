const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dashboardRoutes = require('./dashboardRoutes');

router.use('/users', userRoutes);
router.use('/dashboards', dashboardRoutes);

module.exports = router;
