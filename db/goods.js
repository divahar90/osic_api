var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/osic";

module.exports = {
    postGoods: function (req, callback) {
        mongoClient.connect(url, function (err, db) {
            db.collection("goods").insertOne(req.body, function (err, result) {
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

    getGoods: function (req, callback) {
        mongoClient.connect(url, function (err, db) {
            db.collection("goods").find({}).toArray(function (err, result) {
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
    getGoodsByCategory: function (req, callback) {
        mongoClient.connect(url, function (err, db) {
            db.collection("goods").findAll({ "category": req.params.category }).toArray(function (err, result) {
                if (err) throw err;
                else {
                    callback(result)
                }
                db.close();
            });
        });
    }
}