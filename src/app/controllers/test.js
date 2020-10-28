const { id } = req.params;
            const current = new Date().toLocaleString();
            
            if(!await User.findOne( {_id: id} ))
                return res.status(404).json({ mensagem: 'Usuário não encontrado'});

            const user = await User.findByIdAndUpdate(id, {
                ...req.body,
                dataAtualizacao: current,
                ultimoLogin: current,
            });
                        
            return res.status(200).json({
                user,
                token: generateToken({ id: user._id}),
            });