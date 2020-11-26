const mongoose = require('mongoose');

const EventoSchema = mongoose.Schema({
    nome:{
        type: String,
        minlength:[5, 'O nome do evento é muito curto'],
        maxlenght:[10, 'O nome do evento é muito longo'],
        required: [true, 'O nome do evento é obrigatório']
    },
    descricao:{
        type: String,
        minlength:[5, 'A descrição é muito curta'],
        maxlength:[50, 'A descrição é muito longa'],
        required:[true, 'A descrição do evento é obrigatória']
    },
    valor:{
        type: Number, 
        require:[true, 'O valor do evento é obrigatório']
    },
    data:{
        type: Date,
        require:[true, 'A data do evento é obrigatório']
    },
    vagas:{
        type: Number,
        require:[true, 'A quantidade de vagas é obrigatório']
    }},{timestamps: true}


)

module.exports = mongoose.model('evento', EventoSchema)