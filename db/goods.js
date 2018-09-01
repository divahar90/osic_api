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
            db.collection("goods").find({ $and: [{ postedBy: { $ne: req.params.excludeUser } }, { status: 'available' }] }).toArray(function (err, result) {
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
            db.collection("goods").findAll({ $and: [{ category: req.params.category }, { postedBy: { $ne: req.params.excludeUser } }, { status: 'available' }] }).toArray(function (err, result) {
                if (err) throw err;
                else {
                    callback(result)
                }
                db.close();
            });
        });
    },
    getTopPostedByKampong: function (req, callback) {
        mongoClient.connect(url, function (err, db) {
            db.collection("goods").aggregate([{ $match: { "location": req.params.location } }, { $group: { _id: "$name", count: { $sum: 1 } } }, { $sort: { 'count': -1 } }], function (err, result) {
                if (err) throw err;
                else {
                    callback(result)
                }
                db.close();
            });
        });
    },
    getTopPosted: function (req, callback) {
        mongoClient.connect(url, function (err, db) {
            db.collection("goods").aggregate([{ $group: { _id: "$location", count: { $sum: 1 } } }, { $sort: { 'count': -1 } }], function (err, result) {
                if (err) throw err;
                else {
                    callback(result)
                }
                db.close();
            });
        });
    },
    getTopCategoryPosted: function (req, callback) {
        mongoClient.connect(url, function (err, db) {
            db.collection("goods").aggregate([{ $match: { $and: [{ "location": req.params.location }, { "type": 'giveaway' }] } }, { $group: { _id: "$category", count: { $sum: 1 } } }, { $sort: { 'count': -1 } }], function (err, result) {
                if (err) throw err;
                else {
                    callback(result)
                }
                db.close();
            });
        });
    },
    getTopCategoryRequested: function (req, callback) {
        mongoClient.connect(url, function (err, db) {
            db.collection("goods").aggregate([{ $match: { $and: [{ "location": req.params.location }, { "type": 'requested' }] } }, { $group: { _id: "$category", count: { $sum: 1 } } }, { $sort: { 'count': -1 } }], function (err, result) {
                if (err) throw err;
                else {
                    callback(result)
                }
                db.close();
            });
        });
    }
}