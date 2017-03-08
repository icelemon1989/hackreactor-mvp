var helper = require('./helper.js');

module.exports = function(app) {
    app.get('/', helper.lastKeywordPhotos);
    app.post('/photos', helper.updateDBwithKeyword);
}