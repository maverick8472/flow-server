const {User, validateAuth, validateRegister} = require('../models/user')
const bcrypt = require('bcrypt');
const _ = require('lodash')

async function getCurrentUser(req, res){
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
}

async function loginUser(req, res){
    console.log('login');
    console.log(req.body);
    
    const {error} = validateAuth(req.body);
    if(error) return res.status(400).send(error.details[0].message);
	
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send({message : 'Invalid email or password.'});

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send({message : 'Invalid email or password.'});

    if(user.isDeleted == true) res.status(400).send({message : 'The user with the given ID was not found.'});

    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user, ['_id','username','email']));
}

async function registerUser(req, res){
    console.log('register');
    console.log(req.body);
    
    const {error} = validateRegister(req.body);
    if(error) return res.status(400).send(error.details[0].message);
	
    var message = 'User already registered.';
    let user = await User.findOne({email: req.body.email});
    if(user) {
        if(user.isDeleted == true){
            await user.update({isDeleted: false});
            const token = user.generateAuthToken();
            res.header('x-auth-token',token).send(_.pick(user, ['_id','username','email']));

        }else return res.status(400).send({message});
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

        const token = user.generateAuthToken(); 
        res.header('x-auth-token',token).send(_.pick(user, ['_id','username','email']));
    } 
};

async function editUser(req, res){
    const {error} = validateEdit(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const user = await User.findByIdAndUpdate(req.params.id,
        {
            username: req.body.username,
            password: req.body.password
        },{new: true});
    if(!user) return res.status(404).send('The user with the given ID was not found.');
    res.send(user);
}

async function deleteUser(req, res){
    const user = await User.findByIdAndUpdate(req.params.id,
        {
            isDeleted: true
        },{new: true});
    if(!user) return res.status(404).send('The user with the given ID was not found.');
    res.send({message: "User " + user.username + " deleted successfully!"});

}

exports.getCurrentUser= getCurrentUser;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.editUser = editUser;
exports.deleteUser = deleteUser;