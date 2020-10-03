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
      staticMapSrc: '',
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

    const userSelectedLibrary = event.target.value;

    const finalLibrary = this.state.autoComplete.filter(
      (item) => item.name === userSelectedLibrary
    );

    console.log(finalLibrary);
    const userSelectedLibraryLatitude =
      finalLibrary[0].place.geometry.coordinates[1];
    const userSelectedLibraryLongitude =
      finalLibrary[0].place.geometry.coordinates[0];
    const userSelectedLibraryName = finalLibrary[0].name;

    const selectedLibrary = {
      name: userSelectedLibraryName,
      latitude: userSelectedLibraryLatitude,
      longitude: userSelectedLibraryLongitude,
    };

    // grab name + store name in input field
    // grab the L&L + store for the next API call
    // create toggle to close autocomplete box

    this.setState(
      {
        selectedLibrary,
      },
      () => {
        this.setState({
          libraryInput: userSelectedLibraryName,
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
        circle: `${this.state.selectedLibrary.longitude},${this.state.selectedLibrary.latitude},${this.state.selectedRadius}`,
        sort: 'distance',
        q: 'Coffee Shop',
        pageSize: 10,
      },
    })
      .then((response) => {
        console.log(response);
        // const coffeeShopCoordinates = response.data.results[1].place.geometry.coordinates

        this.setState({ coffeeShops: [...response.data.results] });
      })
      .then(() => {
        const radiusDistance = this.state.selectedRadius / 1000;

        const coffeeShopCoords = this.state.coffeeShops.map(
          (coffeeShop, index) => {
            // console.log(coffeeShop.place.geometry.coordinates);
            const [long, lat] = coffeeShop.place.geometry.coordinates;
            // return coffeeShop.place.geometry.coordinates;
            return `${lat},${long}|marker-md-${index + 1}|`;
            // 43.653427,-79.380764|marker-md-2||43.650378,-79.380355|
          }
        );

        const joinedCoffeeShopCoords = coffeeShopCoords.join('|');
        console.log(joinedCoffeeShopCoords);

        // console.log(coffeeShopCoords);
        // const coffeeShopMarkers = coffeeShopCoords.map(
        //   (coffeeShopCoord, index) => {
        //     coffeeShopCoord.join(`|marker-md${index + 1}||`);
        //   }
        // );

        // console.log(coffeeShopMarkers);

        const staticMapSrc = `https://www.mapquestapi.com/staticmap/v5/map?key=${apiKey}&scalebar=true|bottom&locations=${joinedCoffeeShopCoords}&size=600,600&type=light&shape=radius:${radiusDistance}km|${this.state.selectedLibrary.latitude},${this.state.selectedLibrary.longitude}`;

        this.setState({ staticMapSrc });

        // -	https://www.mapquestapi.com/staticmap/v5/map?key=rNUBvav2dEGGss4WVvHK64tVGGygn3zB&scalebar=true%7Cbottom&locations=43.653427,-79.380764%7Cmarker-md-2%7C%7C43.650378,-79.380355%7Cmarker-md-1&shape=radius:5km%7C43.651893,-79.381713&size=600, 600&type=light&zoom=16&start=43.651893,-79.381713&end=43.653427,-79.380764
        // axios({
        //   url: urlMap,
        //   params: {
        //     key: apiKey,
        //     scalebar: 'true|bottom',
        //     location: joinedCoffeeShopCoords,
        //     shape: `radius:${radiusDistance}km|${this.state.selectedLibrary.longitude},${this.state.selectedLibrary.latitude},${this.state.selectedRadius}`,
        //     size: '600, 600',
        //     type: 'light',
        //   },
        // }).then((results) => {
        //   console.log(results);
        // });
      })
      .catch((error) => console.log(error));
  };

  /*
  -	https://www.mapquestapi.com/staticmap/v5/map
    
    ?key=rNUBvav2dEGGss4WVvHK64tVGGygn3zB
    &scalebar=true|bottom
    
    // values of the coffee shops (long, lat)
    &locations=43.653427,-79.380764|marker-md-2||43.650378,-79.380355|marker-md-1
    
    // values of the library
    &shape=radius:5km|43.651893,-79.381713
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
      state: {
        libraryInput,
        autoComplete,
        showSuggestions,
        selectedRadius,
        staticMapSrc,
      },
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
        <img src={staticMapSrc} />
        <Footer />
      </div>
    );
  }
}
export default App;
