


async function loginUser(req, res){
    
    console.log(req.body);

    const user = {
        username: 'mate',
        password: '123456'
    }

    if(user.username == req.body.username && user.password == req.body.password) res.send('User Exists!')
    else res.status(400).send('The user with the given ID was not found.');
}

exports.loginUser = loginUser;
