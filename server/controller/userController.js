var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

function createToken(user) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 200 // 86400 expires in 24 hours
      });
}

exports.registerUser = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ 'msg': 'You need to send email and password' });
    }

    const { email } = req.body.email;
    try {
        let usuario = await User.findOne({ email });
        if(usuario) {
            return res.status(400).json({ msg: 'El usuario ya existe.' });
        }
        usuario = new User(req.body);
        await usuario.save();

        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).send('Ha ocurrido un error.');
    }
};

exports.loginUser = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ 'msg': 'You need to send email and password' });
    }

    const { email, password } = req.body;
    try {
        let usuario = await User.findOne({ email });
        if(!usuario) {
            return res.status(400).json({ msg: 'El usuario no existe.' });
        }
        usuario.comparePassword(password, (err, isMatch) => {
            if (isMatch && !err) {
                return res.status(200).json({ token: createToken(usuario) });
            } else {
                return res.status(400).json({ msg: 'The email and password not match.' });
            }
        });
    } catch (error) {
        res.status(400).send('Ha ocurrido un error.');
    }
};