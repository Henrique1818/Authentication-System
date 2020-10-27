module.exports = {
    create(req, res) {
        const { name } = req.body

        return res.status(201).json({
            user: name
        })
    }
}