var express = require('express');
var router = express.Router();
var userAPI = require('./users/')

/* GET users listing. */
router.get('/', userAPI.queryuser);
router.get('/', userAPI.adduser);

module.exports = router;