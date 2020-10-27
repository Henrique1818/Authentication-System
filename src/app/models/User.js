const mongoose = require('../../config/Database');

const UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    telefones: [
        {
            numero: {
                type: Number,
                required: true
            },
            DDD: {
                type: Number,
                required: true
            }
        }
    ],
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    dataAtualizacao: {
        type: Date
    },
    ultimoLogin: {
        type: Date
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;