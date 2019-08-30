const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
const app = express();
const config = require('config')
app.use(bodyParser.json());

const db = config.get('mongoURI');

const auth = require('./routes/api/auth');
const users = require('./routes/api/users');
const players = require('./routes/api/players');

mongoose
    .connect(db, { useCreateIndex: true })
    .then(() => {console.log("MongoDB Connected...")})
    .catch(err => console.log(err));


app.use('/api/players', players);
app.use('/api/users', users);
app.use('/api/auth', auth);




app.listen(8000, function () {
    console.log("listening on port 8000");
});

