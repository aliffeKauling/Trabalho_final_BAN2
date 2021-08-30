const Dormitorio = require('../models/dormitorio.model');

module.exports = {
  insert, find
}

function insert(req, res) {
    Dormitorio(req.body).save()
    .then(
        (success)=>{
            res.status(201).json({reqBody:req.body, resposta:success})
        }
    ).catch((err)=>{
            res.status(500).json(err);
        }
    );
}

async function find() {
    return await Dormitorio.find().sort({ numeroPorta: 1 });
}

// async function findOne(nome) {
//     return await Dormitorio.findOne({numeroPorta:RegExp(nome,'i')});
// }