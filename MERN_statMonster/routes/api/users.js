const express =require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');


router.post('/', (req,res) => {
    const {firstName, lastName, email, password} = req.body;

    if(!firstName || !lastName || !email || !password){
        return res.status(400).json({msg: 'Please enter all fields'});
    }

    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).json({msg: 'User already exists'});

            const newUser = new User({
                firstName,
                lastName,
                email,
                password
            });

            //Create salt & hash

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user=>{
                            jwt.sign(
                                {id: user.id},
                                config.get('jwtsecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                        id: user.id,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        email: user.email
                                    }
                                });
                            })
                        });
                })
            })
        })
});

module.exports = router;