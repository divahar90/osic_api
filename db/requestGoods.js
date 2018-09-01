var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/osic";

module.exports = {
    requestGoods: function (req, callback) {
        mongoClient.connect(url, function (err, db) {
            db.collection("request_goods").insertOne(req.body, function (err, result) {
                if (err) {
                    callback({
                        status: 'Fail',
                        message: 'Posting Goods failed'
                    });
                }
                else {
                    callback({
                        status: 'Success',
                        message: 'Posting Goods succeeded'
                    });
                }
                db.close();
            });
        });
    },

    getRequestedGoods: function (req, callback) {
        mongoClient.connect(url, function (err, db) {
            db.collection("request_goods").find({}).toArray(function (err, result) {
                if (err) {
                    callback({
                        status: 'Fail',
                        message: 'Getting Goods failed'
                    });
                } else {
                    if (result.length > 0) {
                        callback(result);
                    }
                    else {
                        callback({
                            status: 'Success',
                            message: 'No Goods found'
                        });
                    }
                    db.close();
                }
            });
        });
    },
    getRequestedGoodsByCategory: function (req, callback) {
        mongoClient.connect(url, function (err, db) {
            db.collection("request_goods").findAll({ "category": req.params.category }).toArray(function (err, result) {
                if (err) throw err;
                else {
                    callback(result)
                }
                db.close();
            });
        });
    }
}