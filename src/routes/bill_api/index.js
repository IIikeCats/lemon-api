var Mongo = require('mongodb-curd');
var batabaseName = 'lemon';
var collcationName = 'bill'

function billCustom(req, res, next) {
    var data = req.body;
    console.log(data)
    if (!data.uid || !data.money || !data.time || !data.icon || !data.type || !data.cName) {
        res.send({ code: 3, msy: "数据不全" })
        return
    }
    Mongo.insert(batabaseName, collcationName, data, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            res.send({
                code: 1,
                mes: "success",
                data: result
            })
        }
    })
}
//查询
function getbill(req, res, next) {
    var data = req.body;
    var query = null;
    if (!data.uid || !data.time) {
        res.send({ code: 3, msy: "缺少数据" })
    }
    //正则
    var times = data.time && new RegExp('^' + data.time);
    if (!data.cName) {
        add = {
            "uid": data.uid,
            "time": times
        }
    } else {
        add = {
            "uid": data.uid,
            "time": times,
            "cName": { "$in": data.cName.split(',') }
        }
    }
    Mongo.find(batabaseName, collcationName, add, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            res.send({
                code: 1,
                mes: "success",
                data: result
            })
        }
    })
}

//删除
function removebill(req, res, next) {
    var ids = req.query.id
    console.log(ids)
    if (!ids) {
        res.send({ code: 3, msy: "数据不全" })
        return
    }

    Mongo.remove(batabaseName, collcationName, { "_id": ids }, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            res.send({
                code: 1,
                mes: "success",
                data: result
            })
        }
    })
}


module.exports = {
    billCustom: billCustom,
    getbill: getbill,
    removebill: removebill
}