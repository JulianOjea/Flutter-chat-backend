const { validationResult } = require("express-validator");

//next: indica que ha de seguir con el siguiente middleware
const fieldValidator = (req, res, next) =>{
    const  errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next();
}

module.exports = {
    fieldValidator
}