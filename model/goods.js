var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/osic";

module.exports = {
    postGoods: function (req, callback) {
        mongoClient.connect(url, function (err, db) {
            db.collection("goods").insertOne(req.body, function (err, result) {
                if (err) {
                    if (err.code == 11000) {
                        callback({
                            status: 'Fail',
                            message: 'Posting Goods failed'
                        });
                    } else
                        throw err;
                    db.close();
                } else {
                    callback({
                        status: 'Success',
                        message: 'Posting Goods succeeded'
                    });
                    db.close();
                }
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
                    db.close();
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
    }
}