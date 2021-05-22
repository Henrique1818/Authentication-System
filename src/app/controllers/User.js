const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

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
            const current = new Date();

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

            let user = await User.findOne({_id: id}).lean();
            
            // 30min
            let limitTime = Math.round((Date.now() - user.ultimoLogin) / (1000 * 60));

            const verifyToken = user.token === token;

            if (!verifyToken) return res.status(403).json({ error: 'Not authorized'});

            switch(verifyToken) {
                case limitTime <= 30: 
                    return res.status(200).json(user);
                default: 
                    return res.status(401).json({ error: 'Invalid session'});
            }
        }
        catch(err) {
            return res.status(400).json({ error: 'Search failed'})
        }
    }

    // async update(req, res) {
    //     try {
    //         const { email } = req.body;
    //         const current = new Date().toLocaleString();
    //         let hash = await bcrypt.hash(req.body.senha, 10);

    //         const foundUser = await User.findOne({email}).lean();

    //         if(!foundUser) return res.status(404).json({ error: 'User not found!'});

    //         const update = {
    //             ...req.body,
    //             senha: hash,
    //             dataAtualizacao: current,
    //             token: generateToken({ id: foundUser._id })
    //         }

    //         let user = User.updateOne({'_id': foundUser._id}, update)

    //         console.log("atualização", user)
    //     }
    //     catch(err) {
    //         return res.status(400).json({error: 'Update error'});
    //     }
    // }
}

module.exports = new UserSvc();


// module.exports = {
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