const mongoose = require('mongoose');

const DormitorioSchema = new mongoose.Schema(
  {
    numeroPorta: { type: String, required: false },
    hashFechadura: { type: String, required: false },
    descricao: { type: String, required: false },
    arranjo: { type: String, required: false },
    qtdaCamaCasal: { type: Number, required: false },
    qtdaCamaSolteiro: { type: Number, required: false },
    suite: { type: Boolean, required: false },
    banheira: { type: Boolean, required: false },
    banheiros: { type: Number, required: false },
    tv: { type: Boolean, required: false },
    tipoVentilacao: { type: String, required: false },
    status: { type: String, required: false },
    idAdmin: { type: mongoose.Types.ObjectId, required: false }
  }, { versionKey: false, timestamps:true, strict:false }
);

module.exports = mongoose.model('Dormitorio', DormitorioSchema);

