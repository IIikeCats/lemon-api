var express = require('express');
var router = express.Router();
var billAPI = require('./bill_api')


router.post('/api/billCustom', billAPI.billCustom);

router.post('/api/getbill', billAPI.getbill);

router.get('/api/removebill', billAPI.removebill);


module.exports = router;