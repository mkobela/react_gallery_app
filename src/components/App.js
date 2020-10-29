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

class App extends Component {

  constructor() {
    super();
    this.isLoading = true;
    this.state = {
      photos: []
    };
  }

  performSearch = (tags) => {
    const URL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tags}&per_page=24&format=json&nojsoncallback=1`;

    axios.get(URL)
      .then(response => {
        console.log(response);
        this.isLoading = false;
        this.setState({
          photos: response.data.photos.photo
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  handleRender = (props) => {
    let tag = props.match.url.substring(1);

    if(tag.startsWith('search')){
      tag = tag.substring(tag.indexOf("/") + 1);
    }
    
    if(this.isLoading){
      this.performSearch(tag);
      return <p>Loading...</p>;
    }else{
      this.isLoading = true;
      return <PhotoContainer photos={this.state.photos} tag={tag} />;
    }
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
        <div className="container">
          <SearchForm />
          <NavBar /> 
          <Switch>
            <Route exact path="/" render={() => <Redirect to='/mountains'/>}/>
            <Route path="/mountains" render = {this.handleRender} />
            <Route path="/rivers" render = {this.handleRender} />
            <Route path="/clouds" render = {this.handleRender} />
            <Route path="/search/:tag"  render = {this.handleRender} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>  
      </BrowserRouter> 
    );
  }
}

export default App;