const mongoose = require('mongoose');


const CheckinSchema = new mongoose.Schema(
    {
       // dataCheckin: { type: Date, default:null },
        diariasReservadas: { type: Number, required: true },
        diariasPagas: { type: Number, default:null },
        valorDiaria: { type: Number, default:null },
        totalPagas: { type: Number, default:null },
        totalPrevisto: { type: Number, default:null }
    }, { versionKey: false, timestamps:true}
);

const CheckoutSchema = new mongoose.Schema(
    {
        desconto: { type: Number, default:null },
        diariasPernoitadas: { type: Number, default:null },
        valorDiarias: { type: Number, default:null },
        valorConsumo: { type: Number, default:null },
        valorTotal: { type: Number, default:null },
        formaDePagamento: { type: String, default:null },
        //dataPagamento: { type: Date, default:null }
    }, { versionKey: false, timestamps:true }
);
  
const ItemSchema = new mongoose.Schema(
{
    descricao: { type: String, default:null },
    quantidade: { type: Number, default:null },
    quantidadeConsumida: { type: Number, default:null },

}, {
    versionKey: false, timestamps:true
});
  
const ConsumoSchema = new mongoose.Schema(
{
    //dataConsumo: { type: String, default:null },
    item: { type: [ItemSchema], default:null }
}, {
    versionKey: false, timestamps:true
});


const ReservaSchema = new mongoose.Schema({
  status: { type: String, default:null, required: false },
  dormitorio: { type: mongoose.Types.ObjectId, default:null, required: false },
  descricao: { type: String, default:null, required: false },
  dataReserva: { type: Date, default:null, required: false },
  dataHoraInicio: { type: Date, default:null, required: false },
  dataHoraFim: { type: Date, default:null, required: false },
  idFuncionario: { type: mongoose.Types.ObjectId, default:null, required: false },
  idHospede: { type: mongoose.Types.ObjectId, default:null, required: false },
  acompanhantes: { type: [mongoose.Types.ObjectId], default:null, required: false },
  checkin: { type: CheckinSchema, default:null, required: false },
  checkout: { type: CheckoutSchema, default:null, required: false },
  consumo: { type: [ItemSchema], default:null, required: false }
}, {
  versionKey: false, timestamps:true
});

module.exports = mongoose.model('Reserva', ReservaSchema);
// {
//     "reserva": {
//       "_id": "ObjectID",
//       "status": "ATIVA/CANCELADA/CONCLUIDA",
//       "dormitorio": "ObjectID",
//       "descricao": "",
//       "dataReserva": "",
//       "dataHoraInicio": "",
//       "dataHoraFim": "",
//       "idFuncionario": "ObjectID",
//       "idHospede": "ObjectID",
//       "acompanhantes": [],
//       "checkin":{
//         "dataCheckin":"",
//         "diariasPagas": 0,
//         "valorDiaria":0.0,
//         "totalPagas":0.0,
//         "dataPagamento":"" 
//       },
//       "checkout": {
//         "desconto": 0,
//         "diarias": 0,
//         "valorDiarias": 0,
//         "valorConsumo": 0,
//         "valorTotal": 0,
//         "formaDePagamento": "",
//         "dataPagamento": ""
//       },
//       "consumo": [
//         {
//           "dataConsumo": "",
//           "item": [
//             {
//               "descricao": "",
//               "quantidade": 0,
//               "quantidadeConsumida": 0
//             }
//           ]
//         }
//       ]
//     }
//   }