// Rutas para autenticar usuarios
const { autenticarUsuario} = require('../controllers/authController')
const express = require('express');
const router = express.Router();
const  { check } = require('express-validator')

// Autenticación usuarios  api/auth
router.post('/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', ' El password debe ser mínimo de 6 caracteres').isLength({min: 6})
    ],  
    autenticarUsuario)

module.exports = router;