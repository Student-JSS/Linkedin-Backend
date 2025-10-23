const express = require('express');
const route = express.Router();
const UserController = require('../controller/user');

route.post('/register',UserController.register)

module.exports = route;