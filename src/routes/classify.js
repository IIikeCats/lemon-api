var express = require('express');
var router = express.Router();
var classifyAPI = require('./classfiy_api')

//
router.get('/api/getCustom', classifyAPI.getCustom);
//添加
router.post('/api/addCustom', classifyAPI.addCustom);
//查看全部
router.post('/api/getclassify', classifyAPI.getclassify);

module.exports = router;