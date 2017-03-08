import React from 'react';
import axios from 'axios';
import querystring from 'query-string';
import '../../public/style.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord: "",
            previousWord: "",
            total_page: 1,
            searchBefore: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRandomButtonClick = this.handleRandomButtonClick.bind(this);
    }

    handleChange(event) {
        this.setState({ searchWord: event.target.value });
    }


    handleSubmit(event) {
        event.preventDefault();
        const searchWord = this.state.searchWord;
        let flickr_url = this.createFlickrUrl(searchWord, this.state.total_page);
        console.log("first time url--------", flickr_url);
        this.setState({
            previousWord: searchWord,
            searchBefore: true,
            searchWord: ""
        })
        this.fetchPicsFromFlickr(flickr_url, searchWord);
    }

    handleRandomButtonClick(event) {
        event.preventDefault();
        const searchWord = this.state.previousWord;
        let flickr_url = this.createFlickrUrl(searchWord, this.state.total_page);
        console.log("random url-------", flickr_url);
        this.fetchPicsFromFlickr(flickr_url, searchWord);
    }

    fetchPicsFromFlickr(flickr_url, searchWord) {
        return axios.get(flickr_url)
            .then(res => {
                this.setState({ total_page: res.data.photos.pages > 800 ? 800 : res.data.photos.pages })
                this.props.getPhotos(res.data.photos.photo);
            })
            .catch(err => {
                console.error("Can't find pictures with keyword " + searchWord + "! The Error is " + err);
            });
    }

    createFlickrUrl(searchText, totalPage) {
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

    render() {
        const isSearchBefore = this.state.searchBefore;
        let randomButton = null;
        if (isSearchBefore) {
            randomButton = <button className="randomButton" onClick={this.handleRandomButtonClick}>More {this.state.previousWord}</button>
        }
        return (
            <form className="SearchBarForm" onSubmit={this.handleSubmit}>
                <input type="text"
                    name="searchword"
                    placeholder="Search keyword..."
                    value={this.state.searchWord}
                    onChange={this.handleChange}
                    required />
                <button type="sumbit" value="Submit">
                    Search on Flickr
                </button>
                {randomButton}
            </form>
        );
    };
}
export default SearchBar;