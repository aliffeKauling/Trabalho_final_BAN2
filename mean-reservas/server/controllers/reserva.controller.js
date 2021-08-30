const Reserva = require('../models/reserva.model');
const mongoose = require('mongoose');
const ObjectID = mongoose.Types.ObjectId;
module.exports = {
  insert, find, findByHospede, updateConsumo, findById, updateCheckout
}

function insert(req, res) {
    
    Reserva(req.body).save()
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
    return await Reserva.find().sort({ dataReserva: 1 });
}

function findById(req, res){
    Reserva.findById(req.params.id, 
        function (err, row) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(row);
            }
        }
    )
}

async function findByHospede(req, res) { //idHospede
    var filtro = [];

        filtro.push({ $lookup: { 
            from: "users", 
            localField: "idHospede", 
            foreignField: "_id", 
            as: "hospede" 
        }});

        filtro.push({ $lookup: { 
            from: "dormitorios", // coleção que vai se relacionar
            localField: "dormitorio", //atributo na coleção Reserva
            foreignField: "_id",  //atributo na coleção a se relacionar (dormitorios)
            as: "dormitorio" //chame de dormitorio o retorno desse relacionamento
        }});

        filtro.push({ $project: { 
            'status': 1, 
            'hospede.fullname': 1, 
            'dormitorio.numeroPorta':1, 
            '_id':1,
            'consumo':1,
            'checkout':1,
            'createdAt': 1 
        }});
    
    if(req.query.nome){
        filtro.push({ $match: { 'hospede.fullname':RegExp(req.query.nome,'i')}});
    }

    Reserva.aggregate( 
        filtro,
        function (err, list) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json(list);
            }
        }
    );
}

function updateConsumo(req, res) {
    let id = req.params.id;
    Reserva.findOneAndUpdate( 
        { _id: new ObjectID(id) }, {$set: {consumo:req.body}},
        function (err, row) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(201).json(row)
            }
        }
    );
}

function updateCheckout(req, res) {
    let id = req.params.id;
    Reserva.findOneAndUpdate( 
        { _id: new ObjectID(id) }, {$set: {checkout:req.body, status:'CONCLUIDA'}},
        function (err, row) {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(201).json(row)
            }
        }
    );
}
