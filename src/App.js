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
      userInput: '', // to register change of library selection
      selectedLibrary: '', // to grab value of library
      selectedRadius: '',
      coffeeShops: [],
      distanceBetween: '',
      selectedCoffeeShop: '',
      
      
    }
  }

  handleUserInputChange = (event) => {
    const userInput = event.target.value;
    console.log(userInput);
    this.setState({userInput}) 
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('form submitted');
  }


  render() {
    return (
      <div className="App">
        <h1>Reading With Caffeine </h1>
        <Form 
          userInput={this.userInput}
          handleUserInputChange={this.handleUserInputChange}
          handleFormSubmit={this.handleFormSubmit}
        />
      </div>
    )
  }
}
export default App;