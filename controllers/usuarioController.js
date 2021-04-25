const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res)=>{
    // Revisar si hay errores
    Errores(req,res);
    // extraer datos del req
    const { email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({ email });
        // Verifica que si el email ya está registrado 
        if(usuario){
           return  res.status(400).json({msg: 'El usuario ya existe'});
        }
        // crea el nuevo usuario
        usuario = new Usuario(req.body);
        // Hashear password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);
        // guardar usuario
        await usuario.save();

        // Crear y firmar el Json Wb Token
        const payload = {
            usuario: {
                id: usuario.id
            }
        };
        // Firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600  //Expira en una hora
        }, (error, token)=>{
            if(error) throw error;
            // Mensaje de confirmación 
            res.json({token});
        });

 
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }    
}