const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../models/User");
const authConfig = require('../../config/authConfig.json');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 1800,
    });
};

module.exports = {
    async create(req, res) {
        try {
            const { email } = req.body

            if(await User.findOne({ email }))
            return res.status(400).json({ error: 'E-mail já existente'});

            const user = await User.create(req.body);
            user.senha = undefined;
            
            return res.status(201).json({
                user,
                token: generateToken({ id: user._id }),
            });
        }
        catch(err) {
            return res.status(400).json({ error: 'Registration failed'});
        }
    },
    async login(req, res) {
        try {
            const { email, senha } = req.body
            const user = await User.findOne({ email }).select('+senha');

            if(!user)
                return res.status(400).json({ mensagem: 'Usuário e ou/ senha inválidos'});

            if(!await bcrypt.compare(senha, user.senha))
                return res.status(401).json({ mensagem: 'Usuário e ou/ senha inválidos'});

            user.senha = undefined;
            const login = Date.now;

            console.log(login())

            res.status(200).json({
                user,
                token: generateToken({ id: user._id }),
                ultimoLogin: login()
            })
        }
        catch(err) {
            console.log(err)
            return res.status(400).json({ error: 'Registration failed'});
        }
    }
}