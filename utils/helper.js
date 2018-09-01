module.exports = {

    computeRatings: function (ratings) {
        if (ratings && ratings.length > 0) {
            var totalRatings = 0;
            var globalRating = 0;
            for (var index = 0; index < ratings.length; index++) {
                var totalRatings = totalRatings + parseInt(ratings[index].stars);
            }
            globalRating = totalRatings / ratings.length;
        }
        return globalRating;
    }
}