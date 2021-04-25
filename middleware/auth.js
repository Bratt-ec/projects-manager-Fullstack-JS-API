const jwt = require('jsonwebtoken');


module.exports = function(req, res, next){
    // leer el token del header
    const token = req.header('x-auth-token');

    // revisamos si no hay token
    if(!token){
        res.status(401).json({msg: 'No hay token, permiso no válido'})
    }

    // Validamos el token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token no válido'})
    }
}