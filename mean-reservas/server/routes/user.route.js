const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/').post(asyncHandler(insert));

router.route('/:tipo').get(userCtrl.findHospedeOrAcompanhante);

router.route('/').get(asyncHandler(find));

async function insert(req, res) { 
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

async function find(req, res) { 
  let users = await userCtrl.findClientes();
  res.json(users);
}
