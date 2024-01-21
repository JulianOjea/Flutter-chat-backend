const {response} = require("express");
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
    const {email, password} = req.body;

    try{

        const emailExists = await User.findOne({email});
        if (emailExists){
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            })
        }

        const user = new User(req.body);

        //Encrypting password
        //salt se usa en criptologia para generar números de manera aleatoria, 
        //genera numeros diferentes pese a que la pass sea la misma
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // Generate Jason Web Token (JWT)
        const token = await generateJWT( user.id );

        await user.save();

        res.json({
            ok: true,
            user,
            token
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk with me'
        })
    }
}

const login = async (req, res = response) => {

    const {email, password} = req.body;

    try{
        
        //Validate if email exists in DB
        const userDB = await User.findOne({email});
        if (!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email doesn\'t exist'
            });
        }

        //Validate password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Password doesn\'t match'
            });
        }

        //Generate JWT
        const token = await generateJWT(userDB.id);

        res.json({
            ok: true,
            user: userDB,
            msg: 'Login',
            token: token
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk with me'
        })
    }
}

const renewToken = async ( req, res = response) =>{

    try {
        //get uid
        const userUID = req.uid;

        //generate new JWT
        const token = await generateJWT(userUID);

        //Get user by UID
        const user = await User.findById(userUID);

        //this may not be needed:
        if (!user){
            return res.status(404).json({
                ok: false,
                msg: 'User doesnt exist',
            });
        }

        res.json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Talk with me'
        })
    }
    
}

module.exports = {
    createUser,
    login,
    renewToken
}