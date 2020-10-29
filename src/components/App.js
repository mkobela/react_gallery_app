/***
 * @author Michael Kobela <mkobela@gmail.com>
 ***/

/******************************************
Treehouse FSJS Techdegree:
Project 7 - React gallery app
******************************************/

import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import SearchForm from './SearchForm';
import NavBar from './NavBar';
import NotFound from './NotFound';
import PhotoContainer from './PhotoContainer';
import axios from 'axios';
import apiKey from '../config';

/**
 * Class App
 * @extends React.Compoment
 */
class App extends Component {

  constructor() {
    super();
    this.onStandby = true;
    this.state = {
      photos: []
    };
  }

  /***
   * @method performSearch
   * @property {string} tag - photo tag to search for
  ***/
  performSearch = (tag) => {

    // calculate a random nubmer to display random pages
    let page = Math.floor(Math.random() * 10);

    // constuct the Flickr URL, set tags, items per page, and page number
    const URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&page=${page}&format=json&nojsoncallback=1`;

    // resquest the photos
    axios.get(URL)
      .then(response => {

        // reset onStandby once photos loaded
        this.onStandby = false;
        this.setState({
          photos: response.data.photos.photo
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  /***
   * @function handleRender
   * @property {object} props - react property object
  ***/
  handleRender = (props) => {
    // obtain tag from match props, remove leading /
    let tag = props.match.url.substring(1);

    // check if this was a search tag
    if (tag.startsWith('search')) {
      // ok, now extract the actual tag
      tag = tag.substring(tag.indexOf("/") + 1);
    }

    if (this.onStandby) {
      // onStandby so show loading message
      this.performSearch(tag);
      return <p>Loading...</p>;
    } else {
      // photos are loaded, reset onStandby
      this.onStandby = true;

      // pass photos to PhotoContainer
      return <PhotoContainer photos={this.state.photos} tag={tag} />;
    }
  }

  /***
   * @method render
  ***/
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="container">
            <SearchForm />
            <NavBar />
            <Switch>
              <Route exact path="/" render={() => <Redirect to='/mountains' />} />
              <Route path="/mountains" render={this.handleRender} />
              <Route path="/rivers" render={this.handleRender} />
              <Route path="/clouds" render={this.handleRender} />
              <Route path="/search/:tag" render={this.handleRender} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;