const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const reservaRoutes = require('./reserva.route');
const dormitorioRoutes = require('./dormitorio.route');
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/reserva', reservaRoutes);
router.use('/dormitorio', dormitorioRoutes);
module.exports = router;
