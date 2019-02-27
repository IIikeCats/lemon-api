var Mongo = require('mongodb-curd');
var batabaseName = 'lemon';
var collcationName = 'coustorm'
var collcationName2 = 'classify'

//自定义分类
function getCustom(req, res, next) {
    Mongo.find(batabaseName, collcationName, {}, function(result) {
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

//查询自定义
function addCustom(req, res, next) {
    var params = req.body;
    if (!params.icon || !params.cName || !params.Uid || !params.type) {
        res.send({
            code: 3,
            mag: "缺少参数"
        })
        return;
    }
    console.log(params);

    isHasClass()

    function isHasClass() {
        //查看数据是否存在
        Mongo.find(batabaseName, collcationName2, {
            "cName": params.cName,
            "Uid": { "$in": ["all", params.cName] },
            "type": params.type
        }, function(result) {
            if (result.length) {
                res.send({
                    code: 4,
                    mag: "已经存在"
                })
            } else {
                //添加数据
                Mongo.insert(batabaseName, collcationName2, params, function(result) {
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
        })
    }

}
//查看所有的类

function getclassify(req, res, next) {
    var params = req.body;

    if (!params.Uid) {
        res.send({
            code: 3,
            mag: "缺少参数"
        })
        return;
    }
    Mongo.find(batabaseName, collcationName2, {
        "Uid": { "$in": ["all", params.Uid] },
    }, function(result) {
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
    getCustom: getCustom,
    addCustom: addCustom,
    getclassify: getclassify
}