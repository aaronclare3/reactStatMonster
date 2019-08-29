const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
const app = express();
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

const players = require('./routes/api/players');

mongoose
    .connect(db)
    .then(() => {console.log("MongoDB Connected...")})
    .catch(err => console.log(err));


app.use('/api/players', players);




app.listen(8000, function () {
    console.log("listening on port 8000");
});

