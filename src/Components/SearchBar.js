import React from 'react';
import axios from 'axios';
import querystring from 'query-string';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ searchWord: event.target.value });
    }


    handleSubmit(event) {
        event.preventDefault();
        const flickr_api_key = 'f03120f221349459a3cd84b143929bdc';
        const searchWord = this.state.searchWord;
        const base_url = "https://api.flickr.com/services/rest/?";
        const params = querystring.stringify({
            method: "flickr.photos.search",
            api_key: flickr_api_key,
            text : searchWord,
            per_page: "30",
            extras: "url_s",
            format: "json",
            nojsoncallback: 1
        });
        this.setState({ searchWord: ""});

        axios.get(base_url + params)
        .then(res => {
            console.log("==================", res.data.photos.photo);
            this.props.getPhotos(res.data.photos.photo);
        })
        .catch(err => {
            console.error("Can't find pictures with keyword " + searchWord + "! The Error is " + err);
        })





        
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                    name="searchword"
                    placeholder="Search keyword..."
                    value={this.state.searchWord}
                    onChange={this.handleChange} />
                <button type="sumbit" value="Submit">
                    Search on Flickr
                    </button>
            </form>
        );
    };
}
export default SearchBar;