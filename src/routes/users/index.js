var Mongo = require('mongodb-curd');
var batabaseName = 'lemon';
var collcationName = 'user'


function queryuser(req, res, next) {
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

function adduser(req, res, next) {

}



module.exports = {
    queryuser: queryuser,
    adduser: adduser
}