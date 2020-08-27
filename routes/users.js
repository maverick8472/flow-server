const express = require('express');
const router = express.Router();

const {auth} = require('../middleware/authentication');
const usersController = require('../controllers/users');

router.get('/me',auth, usersController.getCurrentUser);
router.post('/login', usersController.loginUser);
router.post('/register', usersController.registerUser);

module.exports = router;