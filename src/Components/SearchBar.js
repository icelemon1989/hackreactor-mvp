import React from 'react';
import axios from 'axios';
import utilies from '../utilies.js';
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
        let flickr_url = utilies.createFlickrUrl(searchWord, this.state.total_page);
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
        let flickr_url = utilies.createFlickrUrl(searchWord, this.state.total_page);
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