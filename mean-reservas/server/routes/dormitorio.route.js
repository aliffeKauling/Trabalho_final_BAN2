const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const dormitorioCtrl = require('../controllers/dormitorio.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').post(dormitorioCtrl.insert);
router.route('/').get(asyncHandler(find));

async function find(req, res) {
    let dormitorio = await dormitorioCtrl.find();
    res.status(200).json(dormitorio);
}
