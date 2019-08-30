const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Player = require('../../models/Player');


router.get('/', (req, res) => {
    Player.find()
        .sort({ primaryPosition: -1 })
        .then(players => res.json(players))
        .catch(err => res.json(err));
});

router.post('/', auth, (req, res) => {
    Player.create(req.body)
        .then(data => res.json(data))
        .catch(err => res.json(err))
});

router.delete('/:id', auth, (req, res) => {
    Player.findByIdAndDelete({_id: req.params.id})
    .then(data => res.json(data))
    .catch(err => res.status(err))
});

router.get('/:id', (req, res) => {
    Player.findById({_id: req.params.id})
    .then(data => res.json(data))
    .catch(err => res.status(err))
});


module.exports = router;