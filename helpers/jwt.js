const jwt = require('jsonwebtoken');

const generateJWT = ( uid ) => {

    return new Promise((resolve, reject) => {
        const payload = { uid };

        //JWT SECRET KEY es la password secreta utilizada para firmar los tokesn
        //si se viera expuesta se podria utilizar para firmar los tokens de manera fraudulenta
        //basta con cambiarla para inhabilitarla

        //expiresIn: tiempo que tarda en expirar el token
        jwt.sign( payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '24h'
        }, ( err, token ) => {
            if ( err ) {
                reject('Was no posible to generate JWT');
            }else{
                resolve(token);
            }
        })
    })
}

module.exports = {
    generateJWT
}