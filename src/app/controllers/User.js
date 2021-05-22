const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const current = new Date();

function generateToken(params = {}) {
    return jwt.sign(params, process.env.SECRET_AUTHCONFIG, {
        expiresIn: 1800,
    });
};

class UserSvc {
    async create(req, res) {
        try {
            const { email } = req.body;
            let user = await User.find({ email }).lean();
            
            const newUser = User.create({ ...req.body, token: generateToken({ id: user._id }) });

            return res.status(201).json(await newUser);
        } catch (err) {
            return res.status(400).json({ error: `Registration failed, ${err}` });
        }
    }

    async getLogin(req, res) {
        try {
            const { email, senha } = req.body;

            let user = await User.findOne({ email }).select('+senha').lean();

            if (!user || !await bcrypt.compare(senha, user.senha)) return res.status(403).json({ error: 'Invalid username and / or password' });

            user = await User.findOneAndUpdate({ email }, {
                ...user,
                ultimoLogin: current,
                token: generateToken({ id: user._id })
            }, { new: true, upsert: true }).lean();

            user.senha = undefined;

            return res.status(200).json(user);

        } catch (err) {
            return res.status(400).json({ error: `Login failed, ${err}` });
        }
    }

    async searchForUser(req, res) {
        try {
            const { id } = req.params;
            let [, token ] = req.headers.authorization.split(' ');

            let user = await User.findOne({ _id: id }).lean();
            
            // 30min
            let limitTime = Math.round((Date.now() - user.ultimoLogin) / (1000 * 60));

            const verifyToken = user.token === token;

            if (!verifyToken) return res.status(403).json({ error: 'Not authorized' });

            switch(verifyToken) {
                case limitTime <= 30: 
                    return res.status(200).json(user);
                default: 
                    return res.status(401).json({ error: 'Invalid session' });
            }
        }
        catch(err) {
            return res.status(400).json({ error: `Search failed, ${err}` })
        }
    }

    async update(req, res) {
        try {
            const { email, senha } = req.body;
            current.toLocaleString();
            let hash = await bcrypt.hash(senha, 10);

            const user = await User.findOne({ email }).lean();
            if(!user) return res.status(404).json({ error: 'User not found!'});

            const update = {
                ...req.body,
                senha: hash,
                dataAtualizacao: current,
                token: generateToken({ id: user._id })
            }

            const updateUser = await User.findOneAndUpdate(
                { _id: user._id }, update, { new: true, upsert: true }
            ).lean();

            return res.status(200).json(updateUser);
        }
        catch(err) {
            return res.status(400).json({ error: `Update error, ${err}` });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            
            await User.findByIdAndDelete({ _id: id }).lean();
            
            return res.status(200).json({ message: `Deleted user` })
        } catch (err) {
            return res.status(400).json({ error: `Failed to delete, ${err}` });
        }
    }
}

module.exports = new UserSvc();
