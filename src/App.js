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
      selectedRadius: 5000,
      coffeeShops: [],
      distanceBetween: '',
      selectedCoffeeShop: '',
    };
  }

  handleLibraryInputChange = (event) => {
    // console.log(event);
    if (!this.state.showSuggestions) {
      this.setState({ showSuggestions: true });
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
        }).then((res) => {
          // console.log(res.data.results);
          this.setState({ autoComplete: [...res.data.results] });
        });
      }
    });
  };

  handleLibraryInputSelected = (event) => {
    // console.log(this);

    const selectedLibrary = event.target.value;

    const finalLibrary = this.state.autoComplete.filter((item) => {
      if (item.name === selectedLibrary) {
        return true;
      }
    });
    console.log(finalLibrary);
    const selectedLibraryLatitude =
      finalLibrary[0].place.geometry.coordinates[1];
    const selectedLibraryLongitude =
      finalLibrary[0].place.geometry.coordinates[0];
    const selectedLibraryName = finalLibrary[0].name;

    // grab name + store name in input field
    // grab the L&L + store for the next API call
    // create toggle to close autocomplete box

    this.setState(
      {
        selectedLibraryLatitude,
        selectedLibraryLongitude,
        selectedLibraryName,
      },
      () => {
        this.setState({
          libraryInput: selectedLibraryName,
          showSuggestions: false,
        });
      }
    );
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log('form submitted');
    // start axios call (value of librarySelected and Radio Input)
    /*
    whats being sent
    https://www.mapquestapi.com/search/v4/place?key=rNUBvav2dEGGss4WVvHK64tVGGygn3zB&circle=33.63361,+-112.426403,+5&sort=distance&q=Coffee+Shop&pageSize=10


    */

    // -	https://www.mapquestapi.com/search/v4/place
    // ?key=rNUBvav2dEGGss4WVvHK64tVGGygn3zB
    // &circle=-79.381713, 43.651893, 5000
    // &sort=distance
    // &q=Coffee Shop
    // &pageSize=10
    const apiKey = 'rNUBvav2dEGGss4WVvHK64tVGGygn3zB';
    const urlSearch = 'https://www.mapquestapi.com/search/v4/place';
    const urlMap = 'https://www.mapquestapi.com/staticmap/v5/map';

    axios({
      url: urlSearch,
      params: {
        key: apiKey,
        circle: `${this.state.selectedLibraryLongitude},${this.state.selectedLibraryLatitude},${this.state.selectedRadius}`,
        sort: 'distance',
        q: 'Coffee Shop',
        pageSize: 10,
      },
    })
      .then((response) => {
        console.log(response);
        this.setState({ coffeeShops: [...response.data.results] });
      })
      .then(() => {
        const radiusDistance = this.state.selectedRadius / 1000;

        axios({
          url: urlMap,
          params: {
            key: apiKey,
            scalebar: 'true|bottom',
            location: 'locations of the coffee shops',
            shape: `radius:${radiusDistance}km|${this.state.selectedLibraryLongitude},${this.state.selectedLibraryLatitude},${this.state.selectedRadius}`,
            size: '600, 600',
            type: 'light',
          },
        });
      })
      .catch((error) => console.log(error));
  };

  /*
  -	https://www.mapquestapi.com/staticmap/v5/map
    
    ?key=rNUBvav2dEGGss4WVvHK64tVGGygn3zB
    &scalebar=true%7Cbottom
    
    // values of the coffee shops (long, lat)
    &locations=43.653427,-79.380764%7Cmarker-md-2%7C%7C43.650378,-79.380355%7Cmarker-md-1
    
    // values of the library
    &shape=radius:5km%7C43.651893,-79.381713
    &size=600, 600
    
    &type=light
    &zoom=16
    
    // values of the library
    &start=43.651893,-79.381713

    // value of selected coffee shop
    &end=43.653427,-79.380764



  */

  handleRadiusSelected = (event) => {
    const selectedRadius = event.target.value;
    this.setState({
      selectedRadius,
    });
  };

  render() {
    const {
      handleLibraryInputChange,
      handleLibraryInputSelected,
      handleFormSubmit,
      handleRadiusSelected,
      state: { libraryInput, autoComplete, showSuggestions, selectedRadius },
    } = this;
    return (
      <div className='App'>
        <Header />
        <Form
          libraryInput={libraryInput}
          handleLibraryInputChange={handleLibraryInputChange}
          handleFormSubmit={handleFormSubmit}
          selectedRadius={selectedRadius}
          handleRadiusSelected={handleRadiusSelected}
        />
        <ul>
          {showSuggestions === true &&
            autoComplete.map((results) => {
              return (
                <li className='autoCompleteResults'>
                  <button
                    type='button'
                    key={results.id}
                    onClick={handleLibraryInputSelected}
                    value={results.name}
                  >
                    {results.name}
                  </button>
                </li>
              );
            })}
        </ul>

        <Footer />
      </div>
    );
  }
}
export default App;
