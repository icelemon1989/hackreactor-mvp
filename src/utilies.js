import querystring from 'query-string';

module.exports = {
    createFlickrUrl: function(searchText, totalPage) {
        const flickr_api_key = 'f03120f221349459a3cd84b143929bdc';
        const base_url = "https://api.flickr.com/services/rest/?";
        const randomPage = totalPage === 1 ? 1 : Math.floor(Math.random() * totalPage);
        const params = querystring.stringify({
            method: "flickr.photos.search",
            api_key: flickr_api_key,
            text: searchText,
            per_page: "50",
            extras: "url_s",
            format: "json",
            page: randomPage,
            safe_search: 1,
            nojsoncallback: 1
        });
        return base_url + params;
    }
}