import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Header from './Header';
import Form from './Form';
import Results from './Results';
import Footer from './Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      libraryInput: '', // to register change of library selection
      autoComplete: [], // results from the prediction text
      selectedLibrary: {}, // to grab value of library // pop in here
      selectedRadius: '',
      coffeeShops: [],
      distanceBetween: '',
      selectedCoffeeShop: '',
    };
  }
  componentDidMount() {

  }

  handleLibraryInputChange = (event) => {
    // console.log(event);
    const libraryInput = event.target.value;
    console.log(libraryInput);

    // this.setState(stateToSet, callBackOnce-StateToSet-isComplete)
    this.setState({ libraryInput }, () => {

      if (libraryInput.length >= 3 && libraryInput.length < 25) {
        const apiKey = 'rNUBvav2dEGGss4WVvHK64tVGGygn3zB';

        axios({
          url: 'http://www.mapquestapi.com/search/v3/prediction',
          params: {
            q: this.state.libraryInput,
            collection: 'poi',
            key: apiKey,
          },
        })
          .then((res) => {
            // console.log(res.data.results);
            this.setState({ autoComplete: [...res.data.results] })
          });
      }
    })
  };



  handleLibraryInputSelected = (event) => {
    console.log(event.target.value);
    const selectedLibrary = event.target.value;

    // grab name + store name in input field
    // grab the L&L + store for the next API call 
    // create toggle to close autocomplete box

    this.setState({
      selectedLibrary
    })
  }


  handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log('form submitted');


  };


  render() {
    return (
      <div className='App'>
        <Header />
        <Form
          libraryInput={this.libraryInput}
          handleLibraryInputChange={this.handleLibraryInputChange}
          handleFormSubmit={this.handleFormSubmit}
        />
        <div>
          <h2>Results</h2>
          {this.state.autoComplete.map(results => {
            console.log(results)
            
            return <button key={results.id} onClick={this.handleLibraryInputSelected} value={results.name}>
            {results.name}</button>
            
          })}
        </div>

        <Footer />
      </div>
    );
  }
}
export default App;
