const mongoose = require('mongoose');

const url = 'mongodb+srv://omnistack:omnistack@cluster0-z2kun.mongodb.net/library?retryWrites=true&w=majority';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
});

module.exports = mongoose;