const { response } = require("express");
const User = require ('../models/user');

const getUsers = async ( req, res = response ) => {

    const from = Number ( req.query.from) ||0;

    const users = await User
        .find( {_id: {$ne: req.uid}}) //para los objetos encontrados en su campo id no devolver el que 
        //tiene el id req.uid, es decir devolver todos menos el mi
        .sort('-online') //ordenar por el atributo online el - significa ordenar de forma inversa
        .skip(from) //mostrar a partir de from
        .limit(20); //mostrar solo 2 

    res.json({
        ok: true,
        users
    })
}

module.exports = {
    getUsers
}