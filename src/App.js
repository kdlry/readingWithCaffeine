import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import './App.css';
import Header from './Header';
import Instructions from './Instructions';
import Form from './Form';
import CoffeeShopsList from './CoffeeShopsList';
import Directions from './Directions';
import Footer from './Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      libraryInput: '', // to register change of library selection
      autoComplete: [], // results from the prediction text
      selectedLibrary: {}, // to grab value of library // pop in here
      showSuggestions: false,
      selectedRadius: 5000,
      coffeeShops: [],
      distanceBetween: '',
      selectedCoffeeShop: '',
      displayedMap: '',
      directionsToCoffeeShop: [],
      modeOfTransportation: 'fastest',
      directionsSessionID: '',
      isLoading: 'true',
    };
  }

  handleLibraryInputChange = (event) => {
    // console.log(event);
    if (!this.state.showSuggestions) {
      this.setState({ showSuggestions: true });
    }
    const libraryInput = event.target.value;
    // console.log(libraryInput);

    // this.setState(stateToSet, callBackOnce-StateToSet-isComplete)
    this.setState({ libraryInput }, () => {
      if (libraryInput.length >= 3 && libraryInput.length < 25) {
        const apiKey = 'rNUBvav2dEGGss4WVvHK64tVGGygn3zB';

        axios({
          url: 'http://www.mapquestapi.com/search/v3/prediction',
          // url: 'https://www.mapquestapi.com/search/v4/place',
          params: {
            q: this.state.libraryInput,
            collection: 'poi',
            key: apiKey,
          },
        }).then((res) => {
          // console.log(res.data.results);
          this.setState({ autoComplete: [...res.data.results] });
        })
      } else if (libraryInput.length < 3) {
        this.setState({ showSuggestions: false });
      }
    });
  };

  handleLibraryInputSelected = (event) => {

    const userSelectedLibrary = event.target.value;

    const finalLibrary = this.state.autoComplete.filter(
      (item) => item.name === userSelectedLibrary
    );

    // console.log(finalLibrary);
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

    this.state.libraryInput.toLowerCase() == this.state.autoComplete[0].name.toLowerCase() ? 
      this.setState({
        selectedLibrary: {
          name: this.state.autoComplete[0].name,
          latitude: this.state.autoComplete[0].place.geometry.coordinates[1],
          longitude: this.state.autoComplete[0].place.geometry.coordinates[0],
        }, 
        showSuggestions: false,
      }, this.getCoffeeShops)

    : this.getCoffeeShops();

  };

  getCoffeeShops = () => {
    const apiKey = 'rNUBvav2dEGGss4WVvHK64tVGGygn3zB';
    const urlSearch = 'https://www.mapquestapi.com/search/v4/place';

    axios({
      url: urlSearch,
      params: {
        key: apiKey,
        circle: `${this.state.selectedLibrary.longitude},${this.state.selectedLibrary.latitude},${this.state.selectedRadius}`,
        sort: 'relevance',
        q: 'Coffee Shop',
        pageSize: 50,
      },
    })
      .then((response) => {
        const returnedCoffeeShops = response.data.results;
        
        // creating a copy of the array to randomize and reduce to 10
        let randomCoffeeShops = [...returnedCoffeeShops]

        // standard fisher-yates randomizer to randomize entire array and prevent duplicates
        for (let i = randomCoffeeShops.length - 1; i > 0; i--) {
          const compareIndex = Math.floor(Math.random() * (i+1));
          let temp = randomCoffeeShops[i];
          randomCoffeeShops[i] = randomCoffeeShops[compareIndex];
          randomCoffeeShops[compareIndex] = temp;
        }

        // to reduce array to 10 shops -- removing everything from index 10 and beyond
        randomCoffeeShops.splice(10);
        console.log(randomCoffeeShops);
        
        // grab the first ten shops out of the array
        // for (let i = 0; i < 10; i++) {
        //   const randomCoffeeShopIndex = Math.floor(Math.random() * returnedCoffeeShops.length);
        //   randomCoffeeShops.push(returnedCoffeeShops[randomCoffeeShopIndex]);
        // }

        this.setState({ coffeeShops: randomCoffeeShops });
        console.log(this.state.coffeeShops);
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

        const mapWithoutRoute = `https://www.mapquestapi.com/staticmap/v5/map?key=${apiKey}&scalebar=true|bottom&locations=${joinedCoffeeShopCoords}&size=600,600&type=light&shape=radius:${radiusDistance}km|${this.state.selectedLibrary.latitude},${this.state.selectedLibrary.longitude}`;

        this.setState({
          displayedMap: mapWithoutRoute,
        }, () => {
          setTimeout( ()=> {this.setState({
            // changes the isLoading state -- when the images are ready, will load in the render
            isLoading: false,
          })
        }, 1000)
        })
      })
      .catch((error) => {
        console.log(error)
        Swal.fire({
          title: 'No results',
          text: 'Try another keyword.',
          icon: 'warning',
          confirmButtonText: 'Okay.',
        });
      });
  }
  

  handleCoffeeShopSelected = (event) => {
    // console.log(event)
    const userSelectedCoffeeShop = event.target.value;


    const finalCoffeeShop = this.state.coffeeShops.filter(
      (item) => item.id === userSelectedCoffeeShop
    );

    // console.log(finalLibrary);
    const userSelectedCoffeeShopLatitude =
      finalCoffeeShop[0].place.geometry.coordinates[1];
    const userSelectedCoffeeShopLongitude =
      finalCoffeeShop[0].place.geometry.coordinates[0];
    const userSelectedCoffeeShopName = finalCoffeeShop[0].name;

    const selectedCoffeeShop = {
      name: userSelectedCoffeeShopName,
      latitude: userSelectedCoffeeShopLatitude,
      longitude: userSelectedCoffeeShopLongitude,
    }


    this.setState({
        selectedCoffeeShop,
        // directionsSessionID: ''
      },
      // after setting the selectedCoffeeShop in state completes,
      // call this.getSelectedTransportation to populate the results of the directions (map and list of directions)
      this.getSelectedTransportation
    );
  
  }

  getSelectedTransportation = () => {

    const apiKey = 'rNUBvav2dEGGss4WVvHK64tVGGygn3zB';
    const { selectedLibrary, selectedCoffeeShop, modeOfTransportation } = this.state;

    // make api request to get the directions from the selectedLibrary to the selectedCoffeeShop
    axios({
      url: 'http://www.mapquestapi.com/directions/v2/route',
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
      console.log(results);
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
        const mapWithRoute = `https://www.mapquestapi.com/staticmap/v5/map?session=${this.state.directionsSessionID}&key=${apiKey}&scalebar=true|bottom&size=600,600&type=light&traffic=flow|cons|inc`;
        this.setState({ displayedMap: mapWithRoute });
      })
      
    })

  }


  handleRadiusSelected = (event) => {
    const selectedRadius = event.target.value;
    this.setState({
      selectedRadius,
    });
  };

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
      state: {
        libraryInput,
        autoComplete,
        showSuggestions,
        displayedMap,
        coffeeShops,
        selectedCoffeeShop,
        modeOfTransportation,
        directionsToCoffeeShop,
      },
    } = this;
    return (
      <div className='App'>
        <Header />
        <div className="wrapper">
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
          />
          {/* <ul>
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
        </ul> */}
          { this.state.coffeeShops.length > 0 ? 
         <>
            <div className="mapAndCoffeeShopContainer">
            
              <div className="map">
                { this.state.isLoading ? <div className="loadingSpinner"></div> : 
                <img src={displayedMap} alt="" /> } 
              </div> 

              <CoffeeShopsList
                handleCoffeeShopSelected={handleCoffeeShopSelected}
                coffeeShops={coffeeShops} />
            </div>

              <Directions
                selectedCoffeeShop={selectedCoffeeShop}
                modeOfTransportation={modeOfTransportation}
                handleTransportationChange={handleTransportationChange}
                directionsToCoffeeShop={directionsToCoffeeShop}
              />
         </>
        : null }
       
        </div>
        <Footer />
    </div>
    );
  }
}
export default App;
