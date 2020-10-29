const mongoose = require('../../config/Database');
const bcrypt = require('bcryptjs');

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
    },
    token: {
        type: String,
    }
});

UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;