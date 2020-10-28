const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const authConfig = require('../../config/authConfig.json');


function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 1800,
    });
};

module.exports = {
    async create(req, res) {
        try {
            const { email } = req.body;

            if(await User.findOne({ email }))
                return res.status(400).json({ error: 'E-mail já existente'});

            const user = await User.create(req.body);
            
            return res.status(201).json({
                user,
                token: generateToken({ id: user._id }),
            });
        }
        catch(err) {
            return res.status(500).json({ error: 'Registration failed'});
        }
    },
    async login(req, res) {
        try {
            const current = new Date().toLocaleString();
            const { email, senha } = req.body;

            const user = await User.findOne({ email }).select('+senha');

            if(!user)
                return res.status(401).json({ mensagem: 'Usuário e ou/ senha inválidos'});

            if(!await bcrypt.compare(senha, user.senha))
                return res.status(403).json({ mensagem: 'Usuário e ou/ senha inválidos'});

            await user.updateOne({
                user,
                ultimoLogin: current
            });

            user.senha = undefined;
            
            res.status(200).json({
                user,
                token: generateToken({ id: user._id })
            });
        }
        catch(err) {
            return res.status(500).json({ error: 'Registration failed'});
        }
    },
    async update(req, res) {
        try {
            const { email } = req.params;
            const current = new Date().toLocaleString();

            let user = await User.findOne({ email });
            let hash = await bcrypt.hash(req.body.senha, 10);

            await user.updateOne({
                ...req.body,
                senha: hash,
                dataAtualizacao: current
            });

            return res.status(200).json({
                user,
                token: generateToken({ id: user._id }),
            });
        }
        catch(err) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado'});
        }
    },
    async seekingUser(req, res) {
        const { id } = req.params;
        const token = req.headers.authorization

        console.log(token)

        let user = await User.findOne({_id: id});
        
        return res.status(200).json(user)
    }
};