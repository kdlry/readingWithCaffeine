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
      selectedLibrary: {}, // to grab value of library
      selectedRadius: '',
      coffeeShops: [],
      distanceBetween: '',
      selectedCoffeeShop: '',
    };
  }
  componentDidMount() {

  }

  handleLibraryInputChange = (event) => {
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
            console.log(res.data.results);
            this.setState({ autoComplete: [...res.data.results] })
          });
      }
    })
  };



  handleLibraryInputSelected = (event) => {
    const selectedLibrary = event.target.value;
    this.setState({
      selectedLibrary
    })
  }


  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('form submitted');


  };


  render() {
    return (
      <div className='App'>
        <Header />
        <Form
          userInput={this.userInput}
          handleUserInputChange={this.handleUserInputChange}
          handleFormSubmit={this.handleFormSubmit}
        />
        <div>
          <h2>Results</h2>
          {this.state.autoComplete.map(results => {
            return <p key={results.id} onClick>{results.name}</p>
          })}
        </div>

        <Footer />
      </div>
    );
  }
}
export default App;
