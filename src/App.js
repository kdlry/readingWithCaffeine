import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './App.css';
import Header from './components/Header';
import Instructions from './components/Instructions';
import Form from './components/Form';
import CoffeeShopsList from './components/CoffeeShopsList';
import Footer from './components/Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      libraryInput: '', // to register change of library selection
      autoComplete: [], // results from the prediction text
      selectedLibrary: {}, // to grab value of library // pop in here
      showSuggestions: false,
      selectedRadius: 5,
      coffeeShops: [],
      distanceBetween: '',
      selectedCoffeeShop: '',
      displayedMap: '',
      directionsToCoffeeShop: [],
      modeOfTransportation: 'fastest',
      directionsSessionID: '',
      coffeeShopClicked: false,
      isLoading: 'true',
    };
  }

  // method to handle library input change
  handleLibraryInputChange = (event) => {
    // if auto complete list is not showing update state to true
    if (!this.state.showSuggestions) {
      this.setState({ showSuggestions: true });
    }

    // store user input for later
    const libraryInput = event.target.value;

    // this.setState(stateToSet, callBackOnce-StateToSet-isComplete)

    // update state with the libraryInput
    // then call api to get search ahead (predictive) results
    this.setState({ libraryInput }, () => {
      // if libraryInput is between 3 and 25 characters make a call to the api
      // api does not allow a call for less than 3 characters
      if (libraryInput.length >= 3 && libraryInput.length < 25) {
        const apiKey = 'dgYN9vqDVgOBOwNtvPlR14jKSxdi9dVa';

        axios({
          url: 'https://www.mapquestapi.com/search/v3/prediction',
          params: {
            q: this.state.libraryInput,
            collection: 'poi',
            key: apiKey,
          },
        }).then((res) => {
          //update autoComplete state with the returned search ahead results
          this.setState({ autoComplete: [...res.data.results] });
        })
        .catch(error => {
          Swal.fire({
            title: 'Network Error',
            text: 'Try searching at a later time.',
            icon: 'warning',
            confirmButtonText: 'Okay',
          })
        })
      } else if (libraryInput.length < 3) {
        // if libraryInput is less than 3 hide the autocomplete results
        this.setState({ showSuggestions: false });
      }
    });
  };

  // method to handle the user selecting (onClick) an autocomplete result
  handleLibraryInputSelected = (event) => {
    // store the value of the autocomplete for later
    const userSelectedLibrary = event.target.value;

    // map over the autoComplete array in state to return the properties of the userSelectedLibrary
    const finalLibrary = this.state.autoComplete.filter(
      (item) => item.name === userSelectedLibrary
    );

    // gather ther library's name, latitude, and longitude to be used for location searching
    const userSelectedLibraryLatitude =
      finalLibrary[0].place.geometry.coordinates[1];
    const userSelectedLibraryLongitude =
      finalLibrary[0].place.geometry.coordinates[0];
    const userSelectedLibraryName = finalLibrary[0].name;

    // store the library's name, latitude, and longitude in object
    const selectedLibrary = {
      name: userSelectedLibraryName,
      latitude: userSelectedLibraryLatitude,
      longitude: userSelectedLibraryLongitude,
    };

    // update state with the selectedLibrary object
    this.setState(
      {
        selectedLibrary,

      },
      () => {
        // then update the library input to the userSelectedLibraryName, and hide the autocomplete list
        this.setState({
          libraryInput: userSelectedLibraryName,
          showSuggestions: false,
        });
      }
    );
  };

  // method to handle user submitting the library name and distance to find surrounding coffee shops
  handleFormSubmit = (event) => {
    // prevent form from refreshing page on submit
    event.preventDefault();

    // if user's libraryInput is less than 3 characters display an alert
    this.state.libraryInput.length < 3 ? Swal.fire({
      title: 'No results',
      text: 'Library name must be greater than 3 characters.',
      icon: 'warning',
      confirmButtonText: 'Okay',
    })

    :
    // if there are no autoComplete results OR the selected radius distance is less than 1 or greater than 20
    // display an alert
    this.state.autoComplete.length === 0 || this.state.selectedRadius < 1 || this.state.selectedRadius > 20 ?

      Swal.fire({
        title: 'No results',
        text: 'Try another search.',
        icon: 'warning',
        confirmButtonText: 'Okay',
      })

      :
      // if user does not click on an autocomplete result but types in a direct match
      this.state.libraryInput.toLowerCase() === this.state.autoComplete[0].name.toLowerCase() ?
        // store the library information needed for the mapquest calls in state and make api call to get the coffee shops
        this.setState({
          selectedLibrary: {
            name: this.state.autoComplete[0].name,
            latitude: this.state.autoComplete[0].place.geometry.coordinates[1],
            longitude: this.state.autoComplete[0].place.geometry.coordinates[0],
          },
          showSuggestions: false,
        }, this.getCoffeeShops)
        // else (user clicked on autocomplete suggestion), make api call to get the surrounding coffee shops
        : this.getCoffeeShops();
  };

  // getting surrounding coffee shops of the selected library and storing them in state
  getCoffeeShops = () => {
    const apiKey = 'dgYN9vqDVgOBOwNtvPlR14jKSxdi9dVa';
    const urlSearch = 'https://www.mapquestapi.com/search/v4/place';

    // make api call providing selectedLibrary longitude and latitude with query of Coffee Shops
    axios({
      url: urlSearch,
      params: {
        key: apiKey,
        circle: `${this.state.selectedLibrary.longitude},${this.state.selectedLibrary.latitude},${this.state.selectedRadius * 1000}`,
        sort: 'relevance',
        q: 'Coffee Shop',
        pageSize: 50,
      },
    })
      .then((response) => {
        // store returned results for later
        const returnedCoffeeShops = response.data.results;

        // if no results are returned then display an alert
        if (returnedCoffeeShops.length === 0) {
          Swal.fire({
            title: 'No results',
            text: 'Try another search',
            icon: 'warning',
            confirmButtonText: 'Okay.',
          })
        } else {
          // creating a copy of the array to randomize and reduce to 10
          let randomCoffeeShops = [...returnedCoffeeShops]

          // standard fisher-yates randomizer to randomize entire array and prevent duplicates
          for (let i = randomCoffeeShops.length - 1; i > 0; i--) {
            const compareIndex = Math.floor(Math.random() * (i + 1));
            let temp = randomCoffeeShops[i];
            randomCoffeeShops[i] = randomCoffeeShops[compareIndex];
            randomCoffeeShops[compareIndex] = temp;
          }

          // to reduce array to 10 shops -- removing everything from index 10 and beyond
          randomCoffeeShops.splice(10);

          // store the randomCoffeeShops in state, and then display them
          this.setState({ coffeeShops: randomCoffeeShops }, this.displayCoffeeShops);
        }
      })
      .catch(() => {
        // if an error occurs during the api call display an alert
        Swal.fire({
          title: 'No response',
          text: 'Try searching again later.',
          icon: 'warning',
          confirmButtonText: 'Okay',
        });
      });
  }

  // get the static map of the coffeeShops and the selectedLibrary and update the map image
  displayCoffeeShops = () => {
    const apiKey = 'dgYN9vqDVgOBOwNtvPlR14jKSxdi9dVa';
    const radiusDistance = this.state.selectedRadius;

    // map over stored coffeeShops and return the coordinates string needed for the static map API call
    // ex. ['43.653427,-79.380764|marker-md-1|', '43.650378,-79.380355|marker-md-2|']
    
    const coffeeShopCoords = this.state.coffeeShops.map(
      (coffeeShop, index) => {
        const [long, lat] = coffeeShop.place.geometry.coordinates;
        return `${lat},${long}|marker-md-${index + 1}|`;
      }
    );

    // join the array with '|' in between
    const joinedCoffeeShopCoords = coffeeShopCoords.join('|');

    // construct the selectedLibrary marker's string
    const libraryMarker = `${this.state.selectedLibrary.latitude},${this.state.selectedLibrary.longitude}|marker-md-350482||`;

    // store the static map url to update the displayedMap in state
    const mapWithoutRoute = `https://www.mapquestapi.com/staticmap/v5/map?key=${apiKey}&scalebar=true|bottom&locations=${libraryMarker}${joinedCoffeeShopCoords}&size=500,600&type=light&shape=radius:${radiusDistance}km|${this.state.selectedLibrary.latitude},${this.state.selectedLibrary.longitude}`;

    // update the displayedMap's state with the constructed src url
    this.setState({
      displayedMap: mapWithoutRoute,
      coffeeShopClicked: false,
    }, () => {
      // once the displayedMap has been updated, smooth scrool to the mapAndResults section
      let mapAndResults = document.querySelector('#mapAndResults');
      mapAndResults.scrollIntoView();

      // add a 1.2s delay to allow the image to load and then set isLoading to false
      setTimeout(() => {
        this.setState({
          isLoading: false,
        })
      }, 1200)
    })
  }

  // handle button click to go back to the list of surrounding coffeeShops
  handleBackButton = () => {
    // display the list and map of the surrounding coffee shops
    this.displayCoffeeShops();
  }

  // handle when the user selecteds a coffee shop from the list to get the directions
  handleCoffeeShopSelected = (event) => {
    // to prevent event bubbling down to the h3/p contained in the button
    // use event.currentTarget to target the button where the onClick event is attached to
    const userSelectedCoffeeShop = event.currentTarget.value;

    // filter the selected coffeeShop from state
    const finalCoffeeShop = this.state.coffeeShops.filter(
      (item) => item.id === userSelectedCoffeeShop
    );

    // gather the selectedCoffeeShop name, latitude, and longitude for later
    const userSelectedCoffeeShopLatitude =
      finalCoffeeShop[0].place.geometry.coordinates[1];
    const userSelectedCoffeeShopLongitude =
      finalCoffeeShop[0].place.geometry.coordinates[0];
    const userSelectedCoffeeShopName = finalCoffeeShop[0].name;

    // store the selectedCoffeeShop name, latitude, and longitude in an object
    const selectedCoffeeShop = {
      name: userSelectedCoffeeShopName,
      latitude: userSelectedCoffeeShopLatitude,
      longitude: userSelectedCoffeeShopLongitude,
    }

    // set coffeeShopClicked to false to update state later
    const coffeeShopClicked = !this.state.coffeeShopClicked

    // update state with the selectedCoffeeShop
    // clear the directionsSessionID from the directions API call
    // set coffeeShopClicked to false
    this.setState({
      selectedCoffeeShop,
      directionsSessionID: '',
      coffeeShopClicked,
    },
      // after setting the selectedCoffeeShop in state completes,
      // call this.getSelectedTransportation to populate the results of the directions (map and list of directions)
      this.getSelectedTransportation
    );

  }

  // handle getting the directions from the selectedLibrary and the selectedCoffeeShop
  getSelectedTransportation = () => {

    const apiKey = 'dgYN9vqDVgOBOwNtvPlR14jKSxdi9dVa';
    const { selectedLibrary, selectedCoffeeShop, modeOfTransportation } = this.state;

    // make api request to get the directions from the selectedLibrary to the selectedCoffeeShop
    axios({
      url: 'https://www.mapquestapi.com/directions/v2/route',
      params: {
        key: apiKey,
        from: `${selectedLibrary.latitude},${selectedLibrary.longitude}`,
        to: `${selectedCoffeeShop.latitude},${selectedCoffeeShop.longitude}`,
        routeType: modeOfTransportation,
        scalebar: 'true|bottom',
        size: '600,600',
        type: 'light',
      }
    }).then(results => {
      // store directions array from results
      const directions = results.data.route.legs[0].maneuvers;

      // map over directions array to get the narrative text of each direction
      const directionsToCoffeeShop = directions.map(direction => {
        return direction.narrative;
      })

      // store the sessionId of the api call to use for the map of directions
      const directionsSessionID = results.data.route.sessionId;

      // update state with the directionsToCoffeeShop, and the directionsSessionID
      this.setState({ directionsToCoffeeShop, directionsSessionID }, () => {
        // once the state has been changed, update the mapWithRoute img src to display the visual directions using the sessionID of the directions api call
        const mapWithRoute = `https://www.mapquestapi.com/staticmap/v5/map?session=${this.state.directionsSessionID}&key=${apiKey}&scalebar=true|bottom&size=500,600&type=light&traffic=flow|cons|inc`;
        this.setState({ displayedMap: mapWithRoute });
      })
    })
  }

  // handle the user's input for the selected distance (radius)
  handleRadiusSelected = (event) => {
    const selectedRadius = event.target.value;
    this.setState({
      selectedRadius,
    });
  };

  // handle the user changing the modeOfTransportation dropdown menu
  handleTransportationChange = (event) => {
    const modeOfTransportation = event.target.value;

    this.setState({ modeOfTransportation }, this.getSelectedTransportation);
  }

  render() {
    const {
      handleLibraryInputChange,
      handleLibraryInputSelected,
      handleFormSubmit,
      handleRadiusSelected,
      handleCoffeeShopSelected,
      handleTransportationChange,
      handleBackButton,
      state: {
        libraryInput,
        autoComplete,
        showSuggestions,
        displayedMap,
        coffeeShops,
        selectedCoffeeShop,
        modeOfTransportation,
        directionsToCoffeeShop,
        coffeeShopClicked,
        selectedRadius,
        selectedLibrary,
      },
    } = this;
    return (
      <div className='App'>
        <Header />
        <main className='mainContainer'>
          <div className='wrapper'>
            <Instructions />
            <Form
              libraryInput={libraryInput}
              handleLibraryInputChange={handleLibraryInputChange}
              handleFormSubmit={handleFormSubmit}
              handleRadiusSelected={handleRadiusSelected}
              handleTransportationChange={handleTransportationChange}
              showSuggestions={showSuggestions}
              autoComplete={autoComplete}
              handleLibraryInputSelected={handleLibraryInputSelected}
              selectedRadius={selectedRadius}
            />
          </div>

          {/* If there are coffeeShops then display the list of coffeeShops and the map */}
          {this.state.coffeeShops.length > 0 ?
              <div className='mapAndCoffeeShopBackground' id='mapAndResults'>
                <div className='mapAndCoffeeShopContainer wrapper'>
                  <div className='map'>
                    {/* If state isLoading then display loader...otherise display the map */}
                    {this.state.isLoading ? <div className='spinnerContainer'><div className='loadingSpinner'></div></div> :
                      <img src={displayedMap} alt='' />}
                  </div>

                  <CoffeeShopsList
                    handleCoffeeShopSelected={handleCoffeeShopSelected}
                    coffeeShops={coffeeShops}
                    coffeeShopClicked={coffeeShopClicked}
                    selectedCoffeeShop={selectedCoffeeShop}
                    modeOfTransportation={modeOfTransportation}
                    handleTransportationChange={handleTransportationChange}
                    directionsToCoffeeShop={directionsToCoffeeShop}
                    handleBackButton={handleBackButton} 
                    selectedLibrary={selectedLibrary}
                  />
                </div>
              </div>
            : null}

        </main>
        <Footer />
      </div >
    );
  }
}
export default App;
