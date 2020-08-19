const {User} = require('../models/user')
const bcrypt = require('bcrypt');
const _=require('lodash')

async function loginUser(req, res){
    
    console.log('login');

    const user = {
        username: 'mate',
        password: '123456'
    }

    if(user.username == req.body.username && user.password == req.body.password) res.send('User Exists!')
    else res.status(400).send('The user with the given ID was not found.');
}

async function registerUser(req, res){
    console.log('register');

    var message = 'User already registered.';
    let user = await User.findOne({email: req.body.email});
    if(user) {
        if(user.isDeleted == true){
            await user.update({isDeleted: false});
            res.send(_.pick(user, ['_id','username','email']));

        }else return res.status(400).send(message);
    }
    else{
        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            
        });
    
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
    
        res.send(_.pick(user, ['_id','username','email']));
    }
    
    

};

exports.loginUser = loginUser;
exports.registerUser = registerUser;