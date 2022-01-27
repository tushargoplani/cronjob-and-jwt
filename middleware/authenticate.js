const jwt = require('jsonwebtoken');

const authenticate = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decode = jwt.verify(token, 'verySecretCode')
        req.user = decode;
        next()
    }
    catch(error){
        res.send('Authentication Failed');
    }
}

module.exports = authenticate;