const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

function generateToken(params = {}) {
    return jwt.sign(params, process.env.SECRET_AUTHCONFIG, {
        expiresIn: 1800,
    });
};

class UserSvc {
    async createUser(req, res) {
        try {
            const { email } = req.body;

            let findUser = await User.find({ email });

            if(!findUser) return res.status(400).json({ message: 'E-mail already exists!' });
            
            const newUser = await User.create({ ...req.body, token: generateToken({ id: findUser._id }) }, { new: true });

            return res.status(201).json({ newUser });
        } catch (err) {
            return res.status(400).json({ error: 'Registration failed' });
        }
    }

    async getLogin(req, res) {
        try {
            const { email, senha } = req.body;
            const current = new Date().toLocaleString();

            let user = await User.findOne({ email }).select('+senha');

            if(!user || !await bcrypt.compare(senha, user.senha)) return res.status(403).json({ error: 'Invalid username and / or password' });

            await user.updateOne({
                user,
                ultimoLogin: current,
                token: generateToken({ id: user._id })
            }, { new: false, upsert: true });

            user = await User.findOne({ email }).select('+senha');
            user.senha = undefined;

            return res.status(200).json({ user });

        } catch(err) {
            return res.status(400).json({ error: 'Login failed'});
        }
    }
}

module.exports = new UserSvc();


// module.exports = {
//     async login(req, res) {
//         try {
//             const current = new Date().toLocaleString();
//             const { email, senha } = req.body;

//             let user = await User.findOne({ email }).select('+senha');

//             if(!user)
//                 return res.status(401).json({ error: 'Invalid username and / or password'});

//             if(!await bcrypt.compare(senha, user.senha))
//                 return res.status(403).json({ mensagem: 'Invalid username and / or password'});

//             await user.updateOne({
//                 user,
//                 ultimoLogin: current,
//                 token: generateToken({ id: user._id })
//             });

//             user = await User.findOne({ email }).select('+senha');
//             user.senha = undefined;

//             res.status(200).json({
//                 user
//             });
//         }
//         catch(err) {
//             return res.status(400).json({ error: 'Login failed'});
//         }
//     },
//     async update(req, res) {
//         try {
//             const { email } = req.params;
//             const current = new Date().toLocaleString();

//             let user = await User.findOne({ email });

//             if(!user) return res.status(404).json({ error: 'User not found'});

//             let hash = await bcrypt.hash(req.body.senha, 10);

//             await user.updateOne({
//                 ...req.body,
//                 senha: hash,
//                 dataAtualizacao: current,
//                 token: generateToken({ id: user._id }),
//             });

//             user = await User.findOne({ email });

//             return res.status(200).json({
//                 user
//             });
//         }
//         catch(err) {
//             return res.status(400).json({ error: 'Update failed'});
//         }
//     },
//     async seekingUser(req, res) {
//         try {
//             const { id } = req.params;
//             let [, token] = req.headers.authorization.split(' ');

//             let user = await User.findOne({_id: id});

//             if(await user.token !== token) {
//                 return res.status(403).json({ error: 'Not authorized'});
//             }
            
//             if(await user.token === token) { 
//                 let diff = Math.round((Date.now() - user.ultimoLogin) / (1000 * 60));

//                 if(diff <= 30) return res.status(200).json(user);
                
//                 else return res.status(401).json({ error: 'Invalid session'});
//             }
//         }
//         catch(err) {
//             return res.status(400).json({ error: 'Search failed'})
//         }
//     }
// };