const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id, username: this.username}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User',userSchema);

function validateRegister(req){
    
    const schema = Joi.object({ 
        name: Joi.string() .min(6) .required(),
        username: Joi.string().min(5).max(50).required().label('Username'),
        email: Joi.string().min(5).max(255).email().required().label('Email'),
        password: Joi.string().min(5).max(255).required().label('Password'), 
    });
        
    return schema.validate(req.body);
}

function validateAuth(req) {
    const schema = Joi.object({ 
        name: Joi.string() .min(6) .required(),
        email: Joi.string().min(5).max(255).email().required().label('Email'),
        password: Joi.string().min(5).max(255).required().label('Password'), 
    });
        
    return schema.validate(req.body);
}


exports.User = User;
exports.validateAuth = validateAuth;
exports.validateRegister = validateRegister;

