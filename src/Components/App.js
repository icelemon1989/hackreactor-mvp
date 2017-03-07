import React, { Component } from 'react';
import SearchBar from './SearchBar.js';
import Photos from './Photos.js';
import logo from '../../public/logo.svg';
import '../../public/style.css';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      photos: []
    };

    this.handleGetPhotos = this.handleGetPhotos.bind(this);
  }

  handleGetPhotos(photos) {
    this.setState({'photos': photos});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="App-body">
          <SearchBar getPhotos={this.handleGetPhotos}></SearchBar>
          <Photos data={this.state.photos}></Photos>
        </div>
      </div>
    );
  }
}

export default App;
