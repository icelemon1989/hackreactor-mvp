var PhotoModel = require('./photoModel.js');

module.exports = {

    lastKeywordPhotos: function (req, res) {
        PhotoModel.findOne({}, {}, { sort: { 'date': -1 } })
            .then((err, post) => {
                console.log("lastKeywordPhotos fetching successfully", post);
                res.send(post);
            })
            .catch(err => {
                console.error(err);
            })  
    },

    // receive the array of photos from client-side
    updateDBwithKeyword: function (req, res) {
        console.log('server side update photos being called');
        let searchword = req.body.keyword;
        let new_photos = req.body.photos;
        let updateArray = [{photos: new_photos}, {date: now}, {$inc: {count:1}}];
        PhotoModel.findOneAndUpdate({ keyword: searchword }, updateArray)
            .then(photo => {
                console.log("updating existing keyword successfully with new photos");
                return res.send(photo);
            })
            .then(photo => {
                var queryArray = [{keyword: searchword}, {photos: new_photos}, {count: 0}];
                PhotoModel.create(queryArray)
                .then(newPhoto => {
                    return res.send(newPhoto);
                })
                .catch(err => {
                    console.error(err);
                })
            })
            .catch(err => {
                console.error(err);
            })
    }
}