const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')),
  roles:Joi.array().required()
})


module.exports = {
  insert, findHospedeOrAcompanhante, findClientes
}

async function insert(user) {
 // user = await Joi.validate(user, userSchema, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

function findHospedeOrAcompanhante(req, res) {

  User.find({ roles:req.params.tipo }, //fullname:RegExp(req.params.nome,'i')
    function (err, row) {
      if (err) {
          res.status(500).json(err);
      } else {
          res.status(200).json(row);
      }
    }
  );
}

async function findClientes() {
  return await User.find().sort({ fullname: 1 });
}
