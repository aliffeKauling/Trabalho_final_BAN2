const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const reservaCtrl = require('../controllers/reserva.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

// router.route('/').post(asyncHandler(insert));
// router.route('/').get(asyncHandler(find));

router.route('/').post(reservaCtrl.insert);
router.route('/').get(reservaCtrl.findByHospede);
router.route('/id/:id').get(reservaCtrl.findById);

router.route('/consumo/:id').put(reservaCtrl.updateConsumo); 

router.route('/checkout/:id').put(reservaCtrl.updateCheckout); 

async function find(req, res) {
    let reserva = await reservaCtrl.find();
    res.status(200).json(reserva);
}

