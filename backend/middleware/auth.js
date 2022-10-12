const jwt = require('jsonwebtoken');

//créer un token pour chaque utilisateur 
module.exports = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedtoken = jwt.verify(token, '@611tuazvBLE');
        const userId = decodedtoken.userId;
        req.auth = {
            userId: userId
        };
        next();
    } catch(error){
        res.status(401).json({error})
    };
};