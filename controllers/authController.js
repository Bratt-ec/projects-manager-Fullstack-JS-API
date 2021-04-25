const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Errores } = require("../middleware/errores");

exports.autenticarUsuario = async (req, res) => {
  // Revisar si hay errores
  Errores(req,res);
  // extraer datos del req
  const { email, password } = req.body;

  try {
    //Validación
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }

    // Revisamos el password
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Password incorrecto" });
    }

    // Si todo es correcto Crear y firmar el Json Wb Token
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };
    // Firmar el JWT
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, //Expira en una hora
      },
      (error, token) => {
        if (error) throw error;
        // Mensaje de confirmación
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// Obtiene que usuario está autenticado
exports.usuarioAutenticado = async (req,res)=>{
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    res.json({usuario});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: 'Hubo un error'});
  }
}
