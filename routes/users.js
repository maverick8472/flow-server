const express = require('express');
const router = express.Router();


const usersController = require('../controllers/users');


router.post('/login', usersController.loginUser);
router.post('/register', usersController.registerUser);

module.exports = router;