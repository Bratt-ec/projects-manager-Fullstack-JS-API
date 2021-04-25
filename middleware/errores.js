const { validationResult } = require('express-validator');

exports.Errores = (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errores: errors.array() })
    }
}