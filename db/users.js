var helper = require('../utils/helper');
var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/osic";

module.exports = {
    getUser: function (req, callback) {
        mongoClient.connect(url, function (err, db) {
            db.collection("users").find({ "name": req.params.userName }).toArray(async function (err, result) {
                if (err) {
                    callback({
                        status: 'Fail',
                        message: 'Getting User failed'
                    });
                } else {
                    if (result.length > 0) {
                        if (result.length > 0) {
                            var globalRatings = await helper.computeRatings(result[0].ratings);
                            result[0].totalRatings = globalRatings.toString();
                            callback(result);
                        }
                    }
                    else {
                        callback({
                            status: 'Success',
                            message: 'No User found'
                        });
                    }
                    db.close();
                }
            });
        });
    },
    updateReviewsAndRatings: function (req, callback) {
        mongoClient.connect(url, function (err, db) {
            db.collection("users").update({ "name": req.params.userName }, {
                "$addToSet": { "ratings": req.body }
            }, function (err, result) {
                if (err) {
                    callback({
                        status: 'Fail',
                        message: 'Posted review and rating failed'
                    });
                } else {
                    callback({
                        status: 'Success',
                        message: 'Posted review and rating succeeded'
                    });
                }
                db.close();
            });
        });
    }
}