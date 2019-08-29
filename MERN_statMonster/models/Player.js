const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    firstName:{type: String,required: true},
    lastName:{type: String,required: true},
    age:{type: Number},
    height:{type: String},
    weight:{type: Number},
    college:{type: String},
    jerseyNumber:{type: Number},
    primaryPosition:{type: String},
    team:{type: String},
    img:{type: String},
    apiId:{type: Number},
    draftRound:{type: Number},
    draftYear:{type: Number},
    draftPick:{type: Number},
    injury:{type: String},
    date: {type: Date,default: Date.now},
});

module.exports = Player = mongoose.model('player', PlayerSchema);