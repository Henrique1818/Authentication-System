const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/RestAPI';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
});

module.exports = mongoose;