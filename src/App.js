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
      selectedLibraryLatitude: '',
      selectedLibraryLongitude: '',
      showSuggestions: true,
      selectedLibraryName: '',
      selectedRadius: '',
      coffeeShops: [],
      distanceBetween: '',
      selectedCoffeeShop: '',
    };
  }

  handleLibraryInputChange = (event) => {
    // console.log(event);
    if (!this.state.showSuggestions) {
      this.setState({showSuggestions: true})
    }
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

            // 
          });
      }
    })
  };



  handleLibraryInputSelected = (event) => {
    // console.log(this);
    
    const selectedLibrary = event.target.value;

    const finalLibrary = this.state.autoComplete.filter(item => {
      if (item.name === selectedLibrary) {
        return true;
      }
    })
    console.log(finalLibrary);
    const selectedLibraryLatitude = finalLibrary[0].place.geometry.coordinates[0];
    const selectedLibraryLongitude = finalLibrary[0].place.geometry.coordinates[1];
    const selectedLibraryName = finalLibrary[0].name;



    // grab name + store name in input field
    // grab the L&L + store for the next API call 
    // create toggle to close autocomplete box

    this.setState({
      selectedLibraryLatitude,
      selectedLibraryLongitude,
      selectedLibraryName}, 
      () => {
      this.setState({
        libraryInput: selectedLibraryName,
        showSuggestions: false,
      });
    })
  };


  handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log('form submitted');
  };

  render() {
    const {
      handleLibraryInputChange,
      handleLibraryInputSelected,
      handleFormSubmit,
      state: {
        libraryInput,
        autoComplete,
        showSuggestions,
      }
    } = this;
    return (
      <div className='App'>
        <Header />
        <Form
          libraryInput={libraryInput}
          handleLibraryInputChange={handleLibraryInputChange}
          handleFormSubmit={handleFormSubmit}
        />
        <ul>
          {showSuggestions === true && (
            autoComplete.map(results => {
              return <li className="autoCompleteResults">
                <button
                type="button"
                key={results.id}

                onClick={handleLibraryInputSelected}
                value={results.name}>
                    {results.name} 
                    </button>
              </li>
            })
          )}
        </ul>

        <Footer />
      </div>
    );
  }
}
export default App;
