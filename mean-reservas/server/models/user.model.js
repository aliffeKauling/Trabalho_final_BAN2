const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true , default:null
  },
  email: {
    type: String,
    required: true, default:null,
    unique: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  mobileNumber: { type: String, require:true, default:null },
  hashedPassword: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  roles: [{
    type: String,
  }]
}, {
  versionKey: false
});


module.exports = mongoose.model('User', UserSchema);
// {
//   "pessoa": {
//     "_id": "ObjectID",
//     "perfil": "ADMIN/FUNCIONARIO/HOSPEDE/ACOMPANHANTE",
//     "documento": "",
//     "nome": "",
//     "idade": 0,
//     "endereco": "",
//     "email": "",
//     "telefone": "",
//     "turno": ""
//   }
// }