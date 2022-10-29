const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
const User = require('../models/User');
//permet de s'inscrire tout en hashant le mot de passe 
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({
            userId: user._id,
                        token: jwt.sign(
                            {userId: user._id},
                            '@611tuazvBLE',
                        )
        }))
        .catch(error => {res.status(400).json(null)});
    })
    .catch(error => res.status(500).json({error}));
};

//permet de se connecter  
exports.login = (req, res, next) => {
    User.findOne({email : req.body.email})
    .then(user => {
        if (user === null){
            res.status(401).json(false);
        }
        else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid =>{
                if(!valid){
                    res.status(401).json(false);
                }
                else if (req.body.email === process.env.USEREMAIL ){
                    res.status(200).json({
                        userId: user._id,
                        admin: true,
                        email: req.body.email,
                        token: jwt.sign(
                            {userId: user._id},
                            '@611tuazvBLE',
                        )
                        
                    });
                }
                else{
                    res.status(200).json({
                        userId: user._id,
                        admin:false,
                        email: req.body.email,
                        token: jwt.sign(
                            {userId: user._id},
                            '@611tuazvBLE',
                        )
                        
                    });
                }
            })
            .catch(error =>{
                res.status(500).json({error})
            })
        }

    })
    .catch(error =>{
        res.status(500).json({error});
    })
};
// verifie le token 
exports.verifyToken = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[2];
        const decodedtoken = jwt.verify(token, '@611tuazvBLE');
        res.status(200).json(true);
    }
    catch{
        res.status(200).json(false);
    }
}