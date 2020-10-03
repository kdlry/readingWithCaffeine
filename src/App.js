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
      selectedLibraryName: '',
      selectedRadius: '',
      coffeeShops: [],
      distanceBetween: '',
      selectedCoffeeShop: '',
      clicked: 1,
    };
  }

  componentDidMount() {}

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
        }).then((res) => {
          // console.log(res.data.results);
          this.setState({ autoComplete: [...res.data.results] });
        });
      }
    });
  };
  toggle = () => {
    const increment = this.state.clicked + 1;
    this.setState({
      clicked: increment,
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
      finalLibrary[0].place.geometry.coordinates[0];
    const selectedLibraryLongitude =
      finalLibrary[0].place.geometry.coordinates[1];
    const selectedLibraryName = finalLibrary[0].name;
    const increment = this.state.clicked + 1;

    // grab name + store name in input field
    // grab the L&L + store for the next API call
    // create toggle to close autocomplete box

    this.setState({
      selectedLibraryLatitude,
      selectedLibraryLongitude,
      selectedLibraryName,
      clicked: increment,
      // libraryInput: selectedLibraryName,
      // libraryInput: '',
    });
  };

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
          clicked={this.state.clicked}
          selectedLibraryName={this.state.selectedLibraryName}
        />
        <div>
          <h2>Results</h2>
          {this.state.autoComplete.map((results) => {
            // console.log(this.results.name);

            return (
              <>
                {this.state.clicked % 2 &&
                this.state.libraryInput.length >= 3 ? (
                  <button
                    key={results.id}
                    onClick={this.handleLibraryInputSelected}
                    value={results.name}
                  >
                    {results.name}
                  </button>
                ) : null}
              </>
            );
          })}
          {this.state.libraryInput.length >= 3
            ? [
                this.state.clicked % 2 ? (
                  <button onClick={this.toggle}>🔼</button>
                ) : (
                  <button onClick={this.toggle}>🔽</button>
                ),
              ]
            : null}
        </div>

        <Footer />
      </div>
    );
  }
}
export default App;
